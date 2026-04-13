# Blog App

A production-style blog project built with Next.js (Pages Router) and TypeScript.

## Features
- Static blog list page with periodic regeneration (`revalidate: 60`)
- Dynamic blog details route (`/blogs/[slug]`)
- Pre-rendered dynamic paths using `getStaticPaths`
- Missing route handling with `notFound: true`
- Shared application shell with top navigation and footer

## Tech Stack
- Next.js
- React
- TypeScript

## Project Structure
- `pages/` route definitions
- `components/` reusable UI components
- `lib/` domain data and access helpers
- `styles/` global styles

## Run Locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000`
