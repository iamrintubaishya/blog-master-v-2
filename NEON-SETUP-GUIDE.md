# Neon.tech Database Setup Guide

## Step-by-Step Process (2 Minutes)

### 1. Sign Up
- Go to [neon.tech](https://neon.tech)
- Click "Sign Up" (top right)
- Use GitHub, Google, or email to create account

### 2. Create New Project
- After login, click "Create Project" or "New Project"
- Choose project settings:
  - **Project Name**: `my-blog-database` (or any name you like)
  - **Database Name**: `neondb` (default is fine)
  - **Region**: Choose closest to your location
  - **Postgres Version**: 15 (default)

### 3. Get Connection String
- After project creation, you'll see the dashboard
- Click "Connection Details" or look for "Connection String"
- Copy the **Connection String** (starts with `postgresql://`)
- It looks like: `postgresql://username:password@host.neon.tech/database?sslmode=require`

### 4. Connection String Example
```
postgresql://alex:AbC123dEf@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### 5. Save for Later
Keep this connection string - you'll need it for:
- Vercel environment variables
- Local development
- Any other hosting platform

## What You Get (Free Tier)
- **500 MB storage** (enough for thousands of blog posts)
- **Unlimited connections**
- **99.9% uptime**
- **Automatic backups**
- **SSL security** built-in
- **Web dashboard** to view your data

## Free Tier Limits
- 500 MB database size
- 1 database per project
- No time limit (stays free forever)

## Using the Connection String

### For Vercel Deployment:
1. Go to Vercel project settings
2. Environment Variables section
3. Add: `DATABASE_URL = your-neon-connection-string`

### For Local Development:
Create `.env` file:
```
DATABASE_URL=your-neon-connection-string
SESSION_SECRET=any-random-string-123
```

## Database Management
- **Web Interface**: Neon provides a dashboard to view tables and data
- **SQL Editor**: Run queries directly in browser
- **Monitoring**: Track usage and performance
- **Backups**: Automatic daily backups included

## Security Features
- **SSL/TLS encryption** for all connections
- **IP allowlisting** (optional)
- **Connection pooling** built-in
- **Read replicas** available

## Migration Process
After getting your connection string:
1. Set `DATABASE_URL` environment variable
2. Run: `npm run db:push`
3. Your database schema is created automatically
4. Ready to use!

## Troubleshooting

**Connection failed?**
- Check the connection string is complete
- Ensure SSL mode is included (`?sslmode=require`)
- Verify region matches your location

**Database not found?**
- Double-check database name in connection string
- Ensure project is active (not paused)

**Permission denied?**
- Verify username/password in connection string
- Check if IP restrictions are enabled

## Alternative: If Neon Doesn't Work

### Supabase (Another Free Option)
1. Go to [supabase.com](https://supabase.com)
2. Create project
3. Get connection string from Settings → Database
4. Same setup process

### Railway (Paid but Simple)
1. Go to [railway.app](https://railway.app)
2. Add PostgreSQL service
3. Connection string provided automatically
4. $5/month but zero setup

## Next Steps After Setup
1. ✅ Get connection string from Neon
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel
4. ✅ Add DATABASE_URL to Vercel environment
5. ✅ Your blog is live!

The whole process takes about 5 minutes total.