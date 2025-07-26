#!/usr/bin/env node

/**
 * Production build script for the blog platform
 * Builds both frontend and backend for deployment
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting production build...\n');

try {
  // Clean previous builds
  console.log('📦 Cleaning previous builds...');
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true, force: true });
  }
  fs.mkdirSync('dist', { recursive: true });

  // Build frontend with Vite
  console.log('🎨 Building frontend...');
  execSync('npx vite build', { stdio: 'inherit' });

  // Build backend with esbuild
  console.log('⚙️  Building backend...');
  execSync('npx esbuild server/index.ts --bundle --platform=node --target=node18 --format=esm --outfile=dist/index.js --external:pg-native --external:cpu-features', { stdio: 'inherit' });

  // Copy package.json for production
  console.log('📄 Copying package files...');
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const productionPackageJson = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    type: "module",
    scripts: {
      start: "node index.js"
    },
    dependencies: Object.fromEntries(
      Object.entries(packageJson.dependencies).filter(([key]) => [
        '@neondatabase/serverless',
        'drizzle-orm',
        'express',
        'express-session',
        'connect-pg-simple',
        'passport',
        'passport-local',
        'openid-client',
        'memoizee',
        'multer',
        'ws'
      ].includes(key))
    )
  };
  
  fs.writeFileSync('dist/package.json', JSON.stringify(productionPackageJson, null, 2));

  // Copy migrations directory
  if (fs.existsSync('migrations')) {
    console.log('🗄️  Copying database migrations...');
    fs.cpSync('migrations', 'dist/migrations', { recursive: true });
  }

  // Copy drizzle config
  if (fs.existsSync('drizzle.config.ts')) {
    console.log('🔧 Copying drizzle config...');
    fs.copyFileSync('drizzle.config.ts', 'dist/drizzle.config.ts');
  }

  // Create uploads directory
  console.log('📁 Creating uploads directory...');
  fs.mkdirSync('dist/uploads', { recursive: true });
  fs.writeFileSync('dist/uploads/.gitkeep', '');

  console.log('\n✅ Build completed successfully!');
  console.log('\n📂 Build output:');
  console.log('   - Frontend: dist/public/');
  console.log('   - Backend: dist/index.js');
  console.log('   - Database: dist/migrations/');
  console.log('\n🚀 Ready for deployment!');

} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}