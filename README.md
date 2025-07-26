# Modern Blog Platform

A full-stack blog platform built with TypeScript, React, Express.js, and PostgreSQL. Features a modern admin interface for content management and a responsive public blog interface.

## Features

- 📝 Rich text editor with TipTap for content creation
- 🔐 Secure authentication with Replit OAuth
- 📱 Responsive design that works on all devices
- 🗂️ Category management for organizing content
- 🖼️ Image upload support for blog posts
- 🚀 Fast performance with Vite build tool
- 📊 View tracking for blog posts
- 🎨 Modern UI with Radix components and Tailwind CSS

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast development and builds
- Wouter for lightweight routing
- TanStack Query for data fetching
- Radix UI + shadcn/ui for components
- Tailwind CSS for styling
- TipTap for rich text editing

### Backend
- Node.js with Express.js
- TypeScript with ES modules
- Drizzle ORM with PostgreSQL
- Passport.js for authentication
- Multer for file uploads
- Express sessions with PostgreSQL storage

## Quick Start

### Prerequisites
- Node.js 20+ 
- PostgreSQL database
- Environment variables (see below)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd blog-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Required environment variables
DATABASE_URL=postgresql://user:password@host:port/database
SESSION_SECRET=your-secure-session-secret
REPL_ID=your-replit-app-id
REPLIT_DOMAINS=your-replit-domain.com
```

4. Run database migrations:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Deployment Options

### 1. Replit (Recommended)
The easiest way to deploy is on Replit:
1. Import this repository to Replit
2. Set up a PostgreSQL database
3. Configure environment variables
4. Click "Run" - it's ready!

### 2. GitHub Pages + External Backend
For frontend-only deployment on GitHub Pages:
1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Deploy your backend to a service like Railway, Render, or Vercel
4. Update API endpoints in the frontend

### 3. Full-Stack Deployment
Deploy to platforms that support both frontend and backend:
- **Railway**: Connect GitHub repo, set environment variables
- **Render**: Web service with PostgreSQL add-on
- **Fly.io**: Full-stack deployment with database
- **Vercel**: Frontend + serverless functions

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `SESSION_SECRET` | Secret for session encryption | Yes |
| `REPL_ID` | Replit application ID | Yes (for auth) |
| `REPLIT_DOMAINS` | Comma-separated domains for OAuth | Yes (for auth) |
| `NODE_ENV` | Environment (development/production) | No |

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   └── App.tsx        # Main app component
├── server/                 # Express.js backend
│   ├── db.ts              # Database connection
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database operations
│   ├── replitAuth.ts      # Authentication setup
│   └── vite.ts            # Vite integration
├── shared/                 # Shared TypeScript schemas
│   └── schema.ts          # Database schema and types
├── migrations/             # Database migration files
└── uploads/               # File upload directory
```

## API Routes

### Public Routes
- `GET /` - Homepage with blog posts
- `GET /post/:slug` - Individual blog post
- `GET /api/posts` - List all published posts
- `GET /api/posts/featured` - Get featured post
- `GET /api/categories` - List all categories

### Admin Routes (Authentication Required)
- `GET /admin` - Admin dashboard
- `GET /admin/posts` - Manage posts
- `GET /admin/categories` - Manage categories
- `POST /api/posts` - Create new post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/categories` - Create category
- `POST /api/upload` - Upload images

### Authentication Routes
- `GET /api/login` - Initiate OAuth login
- `GET /api/callback` - OAuth callback
- `GET /api/logout` - Logout user
- `GET /api/auth/user` - Get current user

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit your changes: `git commit -m 'Add feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Join our community discussions

---

Built with ❤️ using modern web technologies.# blog-master-2
# blog-master-2
