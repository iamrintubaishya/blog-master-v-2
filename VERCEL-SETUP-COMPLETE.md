# Complete Vercel Setup - Missing Steps

Your Vercel deployment is working but missing data and database setup. Here's how to fix it:

## 1. Add Environment Variables in Vercel

Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these variables:
```
DATABASE_URL = your-neon-connection-string-here
SESSION_SECRET = any-long-random-string-123456789
NODE_ENV = production
```

## 2. Run Database Migration

After adding environment variables, you need to create the database tables:

### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run database migration
vercel env pull .env.local
npm run db:push
```

### Option B: Manual Database Setup
1. Go to your Neon dashboard
2. Open the SQL editor
3. Run this SQL to create tables:

```sql
-- Create sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
	"sid" varchar PRIMARY KEY NOT NULL,
	"sess" jsonb NOT NULL,
	"expire" timestamp NOT NULL
);

-- Create users table
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" varchar,
	"first_name" varchar,
	"last_name" varchar,
	"profile_image_url" varchar,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Create categories table
CREATE TABLE IF NOT EXISTS "categories" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);

-- Create posts table
CREATE TABLE IF NOT EXISTS "posts" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"featured_image" varchar,
	"status" varchar(20) DEFAULT 'draft' NOT NULL,
	"author_id" varchar NOT NULL,
	"category_id" varchar,
	"published_at" timestamp,
	"read_time" integer,
	"views" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "posts_slug_unique" UNIQUE("slug")
);

-- Add foreign key constraints
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE no action ON UPDATE no action;

-- Create indexes
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "sessions" ("expire");
```

## 3. Add Sample Data (Optional)

After tables are created, add some sample content:

```sql
-- Insert a sample category
INSERT INTO categories (name, slug, description) 
VALUES ('Technology', 'technology', 'Posts about technology and programming');

-- Insert a sample user (you'll need this for admin access)
INSERT INTO users (id, email, first_name, last_name) 
VALUES ('sample-user-id', 'admin@example.com', 'Admin', 'User');

-- Insert a sample post
INSERT INTO posts (title, slug, excerpt, content, status, author_id, category_id, published_at, read_time)
VALUES (
  'Welcome to My Blog',
  'welcome-to-my-blog',
  'This is the first post on my new blog platform.',
  '<h2>Welcome!</h2><p>This is my first blog post. The platform supports rich text editing, categories, and much more.</p>',
  'published',
  'sample-user-id',
  (SELECT id FROM categories WHERE slug = 'technology'),
  NOW(),
  2
);
```

## 4. Redeploy Vercel

After adding environment variables:
1. Go to Vercel dashboard
2. Click "Redeploy" (or push new commit to trigger deployment)
3. Wait for deployment to complete

## 5. Access Admin Panel

The admin panel should now be accessible at:
`https://your-vercel-app.vercel.app/admin`

## 6. Authentication Setup

For the login to work properly, you need to update OAuth settings:
1. The admin login might not work immediately because OAuth is configured for Replit domains
2. For now, you can manually create admin access by inserting a user in the database
3. Later, update the authentication to work with your new domain

## Troubleshooting

**Still no articles showing?**
- Check Vercel function logs in dashboard
- Verify DATABASE_URL is correctly set
- Ensure database tables were created

**Admin panel gives 500 error?**
- Check environment variables are set
- Look at Vercel function logs for specific errors
- Verify SESSION_SECRET is set

**Database connection failed?**
- Double-check DATABASE_URL format
- Ensure Neon database is active
- Test connection in Neon dashboard

## Quick Fix Commands

If you have Vercel CLI installed:
```bash
# Pull environment variables locally
vercel env pull .env.local

# Test database connection
npm run db:push

# Check if tables exist
npx drizzle-kit studio
```

Your blog platform will work exactly the same as on Replit once the database is properly set up!