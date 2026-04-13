import Link from "next/link";
import type { BlogPost } from "../lib/blogs";

type BlogListProps = {
  posts: BlogPost[];
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <ul className="blog-list">
      {posts.map((post) => (
        <li key={post.id} className="blog-item">
          <p className="meta">
            {formatDate(post.publishedAt)} · {post.readingTime}
          </p>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <div className="tag-row" aria-label="Tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <Link href={`/blogs/${post.slug}`}>Read article</Link>
        </li>
      ))}
    </ul>
  );
}

