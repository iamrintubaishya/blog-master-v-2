# Modern Blog Platform - Architecture Documentation

## Overview

This is a full-stack blog platform built with TypeScript, featuring a React frontend with Vite, Express.js backend, PostgreSQL database with Drizzle ORM, and Replit authentication. The application follows a monorepo structure with shared TypeScript schemas and provides both public blog reading and admin content management functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**January 25, 2025**
- ✓ Successfully migrated project from Replit Agent to standard Replit environment
- ✓ Set up PostgreSQL database with proper environment variables
- ✓ Fixed session configuration issues for secure authentication
- ✓ Created comprehensive GitHub deployment setup
- ✓ Added GitHub Actions workflow for automated deployment
- ✓ Created deployment documentation and multiple hosting options
- ✓ Added production build scripts and Docker configuration

## Recent Changes

**January 25, 2025**
- ✓ Successfully migrated project from Replit Agent to standard Replit environment
- ✓ Set up PostgreSQL database with proper environment variables
- ✓ Fixed session configuration issues for secure authentication
- ✓ Created comprehensive GitHub deployment setup
- ✓ Added GitHub Actions workflow for automated deployment
- ✓ Created deployment documentation and multiple hosting options
- ✓ Added production build scripts and Docker configuration

## System Architecture

### Monorepo Structure
The project uses a monorepo approach with three main directories:
- `client/` - React frontend application
- `server/` - Express.js backend API
- `shared/` - Common TypeScript schemas and types

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Rich Text**: TipTap editor for content creation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API design
- **File Uploads**: Multer middleware for image handling
- **Session Management**: Express sessions with PostgreSQL storage

## Key Components

### Database Schema (Drizzle ORM)
- **Users**: Authentication and profile data
- **Posts**: Blog content with status, categories, and metadata
- **Categories**: Content organization
- **Sessions**: Authentication session storage

### Authentication System
- **Provider**: Replit OAuth integration
- **Strategy**: Passport.js with OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions
- **Security**: HTTP-only cookies with CSRF protection

### Content Management
- **Rich Text Editor**: TipTap with toolbar controls
- **Image Upload**: File handling with size and type validation
- **Post Status**: Draft/published workflow
- **SEO Features**: Slug generation and meta descriptions

### Public Interface
- **Landing Page**: Featured posts and article grid
- **Post Reading**: Individual post view with author info
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized images and lazy loading

## Data Flow

### Authentication Flow
1. User clicks admin login → redirects to Replit OAuth
2. Successful authentication → creates/updates user record
3. Session established → user gains admin access
4. Session validation on protected routes

### Content Creation Flow
1. Admin creates/edits post in rich text editor
2. Form validation with Zod schemas
3. Image uploads processed and stored
4. Post saved with generated slug and metadata
5. Published posts appear on public site

### Public Reading Flow
1. Users browse posts on landing page
2. Featured post highlighted at top
3. Individual posts accessed via generated slugs
4. View counts tracked on post access

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **Vite**: Build tool with HMR and optimization
- **Express**: Web framework with middleware support
- **Drizzle ORM**: Type-safe database operations

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library
- **TipTap**: Rich text editing

### Database and Storage
- **Neon Database**: PostgreSQL hosting
- **Multer**: File upload handling
- **Session Storage**: connect-pg-simple

### Authentication
- **Passport.js**: Authentication middleware
- **OpenID Client**: OAuth implementation
- **Memoizee**: Configuration caching

## Deployment Strategy

### Development Environment
- **Hot Reload**: Vite HMR for frontend changes
- **API Proxy**: Development server proxies API calls
- **Database**: Shared PostgreSQL instance
- **File Storage**: Local uploads directory

### Production Build
- **Frontend**: Static assets built to `dist/public`
- **Backend**: Bundled with esbuild to `dist/index.js`
- **Assets**: Served statically by Express
- **Database**: PostgreSQL with connection pooling

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **SESSION_SECRET**: Session encryption key
- **REPLIT_DOMAINS**: OAuth configuration
- **NODE_ENV**: Environment detection

The architecture prioritizes developer experience with hot reloading, type safety throughout the stack, and a clean separation of concerns between public and admin functionality. The system is designed to be easily deployable on Replit while maintaining the flexibility to run in other environments.