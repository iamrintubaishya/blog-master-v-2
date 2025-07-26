import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertPostSchema, insertCategorySchema } from "@shared/schema";
import { randomUUID } from "crypto";
import multer from "multer";
import path from "path";
import fs from "fs";

// Configure multer for file uploads
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Serve uploaded files
  app.use('/uploads', express.static(uploadsDir));

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public blog routes
  app.get('/api/posts', async (req, res) => {
    try {
      const { category, limit = "20", offset = "0", search } = req.query;

      const posts = await storage.getPosts({
        status: "published",
        categoryId: category as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        search: search as string,
      });

      res.json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get('/api/posts/featured', async (req, res) => {
    try {
      const posts = await storage.getPosts({
        status: "published",
        limit: 1,
      });

      res.json(posts[0] || null);
    } catch (error) {
      console.error("Error fetching featured post:", error);
      res.status(500).json({ message: "Failed to fetch featured post" });
    }
  });

  app.get('/api/posts/:slug', async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getPostBySlug(slug);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Increment views for published posts
      if (post.status === "published") {
        await storage.incrementPostViews(post.id);
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Admin routes (protected)
  app.get('/api/admin/posts', isAuthenticated, async (req: any, res) => {
    try {
      const { status, category, search, limit = "50", offset = "0" } = req.query;
      const userId = req.user.claims.sub;

      const posts = await storage.getPosts({
        status: status as string,
        categoryId: category as string,
        authorId: userId,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      });

      res.json(posts);
    } catch (error) {
      console.error("Error fetching admin posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get('/api/admin/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      const post = await storage.getPost(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Ensure user owns the post
      if (post.authorId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({ message: "Failed to fetch post" });
    }
  });

  app.post('/api/admin/posts', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const data = insertPostSchema.parse(req.body);

      // Generate slug and calculate read time
      const slug = generateSlug(data.title);
      const readTime = calculateReadTime(data.content);

      const post = await storage.createPost({
        ...data,
        slug,
        readTime,
        authorId: userId,
        publishedAt: data.status === "published" ? new Date() : null,
      });

      res.status(201).json(post);
    } catch (error: any) {
      console.error("Error creating post:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create post" });
    }
  });

  app.put('/api/admin/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      // Check if post exists and user owns it
      const existingPost = await storage.getPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (existingPost.authorId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const data = insertPostSchema.partial().parse(req.body);

      // Update slug if title changed
      const updates: any = { ...data };
      if (data.title) {
        updates.slug = generateSlug(data.title);
      }

      // Update read time if content changed
      if (data.content) {
        updates.readTime = calculateReadTime(data.content);
      }

      // Set published date if status changed to published
      if (data.status === "published" && existingPost.status !== "published") {
        updates.publishedAt = new Date();
      }

      const post = await storage.updatePost(id, updates);
      res.json(post);
    } catch (error: any) {
      console.error("Error updating post:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid post data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update post" });
    }
  });

  app.delete('/api/admin/posts/:id', isAuthenticated, async (req: any, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.claims.sub;

      // Check if post exists and user owns it
      const existingPost = await storage.getPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (existingPost.authorId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      await storage.deletePost(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Failed to delete post" });
    }
  });

  app.get('/api/admin/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const stats = await storage.getPostStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // File upload route
  app.post('/api/admin/upload', isAuthenticated, upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const fileUrl = `/uploads/${req.file.filename}`;
      res.json({ url: fileUrl });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Failed to upload file" });
    }
  });

  // Category management routes
  app.post('/api/admin/categories', isAuthenticated, async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const slug = generateSlug(data.name);

      const category = await storage.createCategory({
        ...data,
        slug,
      });

      res.status(201).json(category);
    } catch (error: any) {
      console.error("Error creating category:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ message: "Invalid category data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
