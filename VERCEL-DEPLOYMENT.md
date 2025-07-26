# Deploy Your Blog to Vercel

## Quick Setup (5 Minutes)

### Step 1: Database Setup (Free)
1. Go to [neon.tech](https://neon.tech)
2. Sign up and create a new project
3. Copy the connection string (starts with `postgresql://`)

### Step 2: GitHub Setup
1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-blog.git
git push -u origin main
```

### Step 3: Vercel Deployment
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Node.js project

### Step 4: Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
DATABASE_URL = postgresql://your-connection-string-from-neon
SESSION_SECRET = any-long-random-string-here-123456789
NODE_ENV = production
```

### Step 5: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your blog is live!

## What You Get

✅ **Free hosting** for your blog  
✅ **Custom domain** (yoursite.vercel.app)  
✅ **SSL certificate** (https automatically)  
✅ **All features working** (admin, posts, images, auth)  
✅ **Fast global CDN**  
✅ **Automatic deployments** when you push to GitHub  

## Database Options

### Option 1: Neon (Recommended - Free)
- **Cost**: Free for 500MB storage
- **Setup**: 30 seconds
- **Perfect for**: Personal blogs, small projects

### Option 2: Supabase (Free Alternative)
- **Cost**: Free for 500MB storage  
- **Setup**: 1 minute
- **Bonus**: Built-in admin dashboard

### Option 3: Railway (Paid but Easy)
- **Cost**: $5/month
- **Setup**: Automatic
- **Perfect for**: Professional sites

## Deployment Commands

Add these to your `package.json` scripts:
```json
{
  "scripts": {
    "vercel-build": "npm run build && npm run db:push",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  }
}
```

## File Structure for Vercel
```
your-blog/
├── server/           # Backend API
├── client/           # Frontend React app  
├── shared/           # Shared types
├── vercel.json       # Vercel configuration
└── package.json      # Dependencies
```

## Custom Domain (Optional)
1. Buy domain from any provider
2. In Vercel dashboard: Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. SSL automatically enabled

## Troubleshooting

**Build fails?**
- Check Node.js version is 18+ in `package.json`
- Ensure all dependencies are listed

**Database connection error?**
- Verify DATABASE_URL is correct
- Check Neon database is active

**Images not uploading?**
- Vercel has limitations on file storage
- Consider using Cloudinary for images

## Cost Breakdown

- **Vercel hosting**: Free (hobby tier)
- **Neon database**: Free (500MB)
- **Custom domain**: $10-15/year (optional)
- **Total**: $0/month (or $1/month with domain)

## Why Vercel is Great

- **Zero configuration** needed
- **Automatic scaling** handles traffic spikes
- **Global CDN** makes your blog fast worldwide
- **Git integration** deploys when you push code
- **Professional** hosting used by major companies

Your blog will have the exact same functionality as on Replit, just hosted on Vercel's professional infrastructure!