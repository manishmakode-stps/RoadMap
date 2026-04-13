export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  tags: string[];
  readingTime: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "nextjs-routing-patterns",
    title: "Practical Next.js Routing Patterns",
    excerpt: "A guide to designing folder structures and route conventions that scale.",
    content:
      "As your Next.js app grows, route consistency becomes critical. Prefer predictable folder naming, keep URL structure stable, and design dynamic segments for long-term readability. Clear route architecture makes onboarding and maintenance much easier.",
    author: "Mani S",
    publishedAt: "2026-04-01",
    tags: ["Next.js", "Architecture"],
    readingTime: "5 min read",
  },
  {
    id: 2,
    slug: "static-generation-for-blogs",
    title: "Why Static Generation Works So Well for Blogs",
    excerpt: "Use static generation to deliver fast pages and dependable SEO performance.",
    content:
      "Blog content is usually read-heavy and write-light, which makes static generation a strong default. Combine getStaticPaths with getStaticProps for robust dynamic detail pages and then layer ISR when content updates regularly.",
    author: "Mani S",
    publishedAt: "2026-04-03",
    tags: ["SSG", "Performance"],
    readingTime: "4 min read",
  },
  {
    id: 3,
    slug: "handling-missing-content",
    title: "Handling Missing Content Gracefully",
    excerpt: "Avoid broken UX by using notFound and thoughtful fallback behavior.",
    content:
      "Not every slug will remain valid forever. Returning notFound from getStaticProps helps your users land on a proper 404 page instead of an empty template. With fallback modes, you can choose strict, loading-first, or blocking generation behavior.",
    author: "Mani S",
    publishedAt: "2026-04-05",
    tags: ["Error Handling", "UX"],
    readingTime: "6 min read",
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

