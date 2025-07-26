import {
  users,
  posts,
  categories,
  type User,
  type UpsertUser,
  type Post,
  type InsertPost,
  type Category,
  type InsertCategory,
  type PostWithAuthorAndCategory,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike, count, sql } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  // Post operations
  getPosts(options?: {
    status?: string;
    categoryId?: string;
    authorId?: string;
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<PostWithAuthorAndCategory[]>;
  getPost(id: string): Promise<PostWithAuthorAndCategory | undefined>;
  getPostBySlug(slug: string): Promise<PostWithAuthorAndCategory | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: string): Promise<void>;
  incrementPostViews(id: string): Promise<void>;

  // Stats
  getPostStats(authorId?: string): Promise<{
    totalPosts: number;
    totalViews: number;
    publishedPosts: number;
    draftPosts: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.name);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category> {
    const [updatedCategory] = await db
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  // Post operations
  async getPosts(options: {
    status?: string;
    categoryId?: string;
    authorId?: string;
    limit?: number;
    offset?: number;
    search?: string;
  } = {}): Promise<PostWithAuthorAndCategory[]> {
    const { status, categoryId, authorId, limit = 50, offset = 0, search } = options;

    let query = db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id));

    const conditions = [];

    if (status) {
      conditions.push(eq(posts.status, status));
    }

    if (categoryId) {
      conditions.push(eq(posts.categoryId, categoryId));
    }

    if (authorId) {
      conditions.push(eq(posts.authorId, authorId));
    }

    if (search) {
      conditions.push(ilike(posts.title, `%${search}%`));
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as typeof query;
    }

    const results = await query
      .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return results.map(row => ({
      ...row.posts,
      author: row.users!,
      category: row.categories,
    }));
  }

  async getPost(id: string): Promise<PostWithAuthorAndCategory | undefined> {
    const [result] = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.id, id));

    if (!result) return undefined;

    return {
      ...result.posts,
      author: result.users!,
      category: result.categories,
    };
  }

  async getPostBySlug(slug: string): Promise<PostWithAuthorAndCategory | undefined> {
    const [result] = await db
      .select()
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.slug, slug));

    if (!result) return undefined;

    return {
      ...result.posts,
      author: result.users!,
      category: result.categories,
    };
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [newPost] = await db.insert(posts).values(post).returning();
    return newPost;
  }

  async updatePost(id: string, post: Partial<InsertPost>): Promise<Post> {
    const [updatedPost] = await db
      .update(posts)
      .set({ ...post, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return updatedPost;
  }

  async deletePost(id: string): Promise<void> {
    await db.delete(posts).where(eq(posts.id, id));
  }

  async incrementPostViews(id: string): Promise<void> {
    await db
      .update(posts)
      .set({ views: sql`${posts.views} + 1` })
      .where(eq(posts.id, id));
  }

  async getPostStats(authorId?: string): Promise<{
    totalPosts: number;
    totalViews: number;
    publishedPosts: number;
    draftPosts: number;
  }> {
    const conditions = authorId ? [eq(posts.authorId, authorId)] : [];

    const [totalResult] = await db
      .select({ count: count() })
      .from(posts)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const [publishedResult] = await db
      .select({ count: count() })
      .from(posts)
      .where(
        conditions.length > 0
          ? and(...conditions, eq(posts.status, "published"))
          : eq(posts.status, "published")
      );

    const [draftResult] = await db
      .select({ count: count() })
      .from(posts)
      .where(
        conditions.length > 0
          ? and(...conditions, eq(posts.status, "draft"))
          : eq(posts.status, "draft")
      );

    const [viewsResult] = await db
      .select({ totalViews: sql`COALESCE(SUM(${posts.views}), 0)` })
      .from(posts)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    return {
      totalPosts: totalResult.count,
      totalViews: Number(viewsResult.totalViews) || 0,
      publishedPosts: publishedResult.count,
      draftPosts: draftResult.count,
    };
  }
}

export const storage = new DatabaseStorage();
