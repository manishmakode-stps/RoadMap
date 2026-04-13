# Day 4 - API Routes (Next.js)

## What this project includes
- API route at `/api/products`
- Static mocked products JSON
- `GET` method support with `405` for unsupported methods
- Frontend page (`/products`) that fetches data from the API

## Run
1. `pnpm install` (or `npm install`)
2. `pnpm run dev` (or `npm run dev`)
3. Open:
- `http://localhost:3000`
- `http://localhost:3000/products`
- `http://localhost:3000/api/products`

## Answers
### How do you create an API route in Next.js?
Create a file inside `pages/api`, for example `pages/api/products.ts`, and export a default handler function.

### What is the folder structure for API routes?
All API routes live inside `pages/api`.  
Example: `pages/api/products.ts` maps to `/api/products`.

### How do you return a JSON response from an API route?
Use `res.status(code).json(data)`.

### What HTTP methods are available in API routes?
Any HTTP method can be handled (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, etc.) by checking `req.method`.

### Can you connect to a database in API routes?
Yes. API routes run on the server side, so you can safely connect to databases and other backend services.
