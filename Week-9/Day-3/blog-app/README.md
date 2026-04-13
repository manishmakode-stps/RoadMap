# Day 3 - Next.js Data Fetching Assignment (TypeScript)

## Project Root
`blog-app`

## What this project shows
- `getStaticProps` in `pages/static-blogs.tsx` for static generation.
- `getServerSideProps` in `pages/server-blogs.tsx` for request-time rendering.
- Shared blog API function in `lib/fetchBlogs.ts`.
- Reusable blog list UI in `components/BlogList.tsx`.
- TypeScript types for props and blog data.

## Run the project
1. `cd blog-app`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Theory Answers
### When should you use `getStaticProps`?
Use it when page data does not change on every request and can be pre-rendered at build time for performance.

### Difference between `getStaticProps` and `getServerSideProps`
- `getStaticProps`: Runs at build time (and on revalidation for ISR).
- `getServerSideProps`: Runs on every request on the server.

### How do you fetch data server-side in Next.js?
Use `getServerSideProps` and fetch data inside it, then return it through `props`.

### Can you use Axios or fetch inside `getStaticProps`?
Yes. Both are valid. In this project, native `fetch` is used.

### What are `revalidate` and ISR?
- `revalidate` is a number (seconds) in `getStaticProps`.
- ISR (Incremental Static Regeneration) allows Next.js to update static pages in the background after the revalidate window.