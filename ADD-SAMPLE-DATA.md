# Add Sample Data to Your Blog

Your database tables are created but empty. Here's how to add sample articles:

## Option 1: Add Sample Data via Neon SQL Editor

Go to your Neon SQL Editor and run this code to add sample content:

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES 
('Technology', 'technology', 'Latest tech trends and tutorials'),
('Programming', 'programming', 'Coding guides and best practices'),
('Design', 'design', 'UI/UX design insights');

-- Insert sample user (needed for blog posts)
INSERT INTO users (id, email, first_name, last_name) VALUES 
('sample-admin', 'admin@yourblog.com', 'Blog', 'Admin');

-- Insert sample blog posts
INSERT INTO posts (title, slug, excerpt, content, status, author_id, category_id, published_at, read_time, views) VALUES 
(
  'Welcome to My Blog Platform',
  'welcome-to-my-blog-platform',
  'This is the first post on my new blog platform built with React and Express.',
  '<h2>Welcome!</h2><p>This is my first blog post on this amazing platform. It features a rich text editor, category management, and responsive design.</p><p>The platform is built with modern technologies including React, Express.js, PostgreSQL, and TypeScript.</p>',
  'published',
  'sample-admin',
  (SELECT id FROM categories WHERE slug = 'technology'),
  NOW(),
  3,
  45
),
(
  'Getting Started with React Hooks',
  'getting-started-react-hooks',
  'Learn the basics of React Hooks and how they can simplify your component logic.',
  '<h2>Introduction to React Hooks</h2><p>React Hooks were introduced in React 16.8 and have revolutionized how we write React components.</p><h3>useState Hook</h3><p>The useState hook allows you to add state to functional components:</p><pre><code>const [count, setCount] = useState(0);</code></pre><p>This simple example shows how to manage state in a functional component.</p>',
  'published',
  'sample-admin',
  (SELECT id FROM categories WHERE slug = 'programming'),
  NOW(),
  8,
  127
),
(
  'Modern Web Design Principles',
  'modern-web-design-principles',
  'Essential design principles every web developer should know in 2024.',
  '<h2>Design Principles for Modern Web</h2><p>Good web design is crucial for user experience and business success.</p><h3>1. Mobile-First Design</h3><p>Always start designing for mobile devices first, then scale up to larger screens.</p><h3>2. Accessibility</h3><p>Ensure your designs are accessible to users with disabilities by following WCAG guidelines.</p><h3>3. Performance</h3><p>Optimize images, minimize CSS/JS, and use modern loading techniques.</p>',
  'published',
  'sample-admin',
  (SELECT id FROM categories WHERE slug = 'design'),
  NOW(),
  6,
  89
);

-- Set one post as featured (highest views)
UPDATE posts SET views = 200 WHERE slug = 'getting-started-react-hooks';
```

## Option 2: Use Admin Panel (After Login Setup)

1. First add environment variables in Vercel:
   - `DATABASE_URL` = your neon connection string
   - `SESSION_SECRET` = random-string-123

2. Redeploy Vercel

3. Go to `/admin` on your live site

4. Create posts through the admin interface

## Quick Test

After adding sample data, visit your Vercel URL:
- Homepage should show 3 articles
- Featured post should appear at top
- Category filtering should work
- Individual post pages should load

## Verify Data Added

In Neon SQL Editor, run:
```sql
SELECT title, status, views FROM posts;
SELECT name FROM categories;
SELECT email FROM users;
```

You should see your sample data listed.