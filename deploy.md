# Deployment Guide

This guide covers different ways to deploy your blog platform.

## GitHub Repository Setup

1. **Create a new GitHub repository**:
   - Go to GitHub and create a new repository
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

## Deployment Options

### Option 1: Railway (Recommended for Full-Stack)

Railway is perfect for full-stack applications with databases.

1. **Sign up at [Railway](https://railway.app)**
2. **Connect your GitHub repository**
3. **Add PostgreSQL database**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will provide a DATABASE_URL automatically
4. **Set environment variables**:
   ```
   SESSION_SECRET=your-random-secret-key-here
   NODE_ENV=production
   ```
5. **Deploy**: Railway will automatically build and deploy your app

**Cost**: ~$5-10/month for hobby projects

### Option 2: Render

Great for full-stack applications with built-in database support.

1. **Sign up at [Render](https://render.com)**
2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Start command: `npm start`
3. **Add PostgreSQL database**:
   - Create a new PostgreSQL service
   - Copy the database URL
4. **Set environment variables**:
   ```
   DATABASE_URL=your-postgresql-url
   SESSION_SECRET=your-random-secret-key
   NODE_ENV=production
   ```

**Cost**: Free tier available, paid plans start at $7/month

### Option 3: Vercel (Frontend) + Neon (Database)

Deploy frontend to Vercel and use Neon for PostgreSQL.

1. **Set up database on [Neon](https://neon.tech)**:
   - Create a new project
   - Copy the connection string

2. **Deploy to Vercel**:
   - Install: `npm i -g vercel`
   - Run: `vercel`
   - Follow the prompts

3. **Add environment variables in Vercel dashboard**:
   ```
   DATABASE_URL=your-neon-postgresql-url
   SESSION_SECRET=your-random-secret-key
   ```

**Cost**: Free tier available for both services

### Option 4: Fly.io

Great for Docker-based deployments with database support.

1. **Install Fly CLI and sign up**
2. **Initialize your app**:
   ```bash
   fly launch
   ```
3. **Add PostgreSQL**:
   ```bash
   fly postgres create
   ```
4. **Set secrets**:
   ```bash
   fly secrets set SESSION_SECRET=your-random-secret
   ```
5. **Deploy**:
   ```bash
   fly deploy
   ```

**Cost**: Pay-as-you-go pricing, very affordable for small apps

## Environment Variables Setup

For any deployment platform, you'll need these environment variables:

### Required Variables:
```bash
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=a-long-random-string-for-security
```

### Optional Variables:
```bash
NODE_ENV=production
PORT=5000
```

### For Replit Authentication (if using):
```bash
REPL_ID=your-replit-app-id
REPLIT_DOMAINS=your-domain.com
```

## Production Build

Before deploying, make sure your build script works:

1. **Test the build locally**:
   ```bash
   npm run build
   npm start
   ```

2. **Check the build output**:
   - Frontend builds to `dist/public/`
   - Backend builds to `dist/index.js`

## Database Migration

For production deployments:

1. **Push schema to production database**:
   ```bash
   npm run db:push
   ```

2. **Optional: Add sample data**:
   ```bash
   node scripts/populate-blog.js
   ```

## Custom Domain Setup

Most platforms support custom domains:

1. **Buy a domain** (GoDaddy, Namecheap, etc.)
2. **Add domain in your platform's dashboard**
3. **Update DNS records** as instructed by the platform
4. **Enable SSL** (usually automatic)

## Monitoring and Maintenance

After deployment:

1. **Monitor application logs** for errors
2. **Set up uptime monitoring** (UptimeRobot, Pingdom)
3. **Regular database backups** (most platforms handle this)
4. **Update dependencies** regularly

## Troubleshooting

### Common Issues:

1. **Database connection errors**:
   - Check DATABASE_URL format
   - Ensure database is accessible from your deployment

2. **Build failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

3. **Authentication issues**:
   - Update OAuth redirect URLs for your new domain
   - Check REPLIT_DOMAINS environment variable

4. **File upload issues**:
   - Most platforms have ephemeral storage
   - Consider using cloud storage (AWS S3, Cloudinary)

## Performance Optimization

For production:

1. **Enable gzip compression**
2. **Use CDN for static assets**
3. **Optimize images** before uploading
4. **Database indexing** for better query performance
5. **Connection pooling** for database connections

---

Choose the deployment option that best fits your needs and budget. Railway and Render are the easiest for beginners, while Vercel + Neon offers great scalability.