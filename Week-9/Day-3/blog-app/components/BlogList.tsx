import type { Blog } from "../lib/fetchBlogs";

type BlogListProps = {
  blogs: Blog[];
};

export default function BlogList({ blogs }: BlogListProps) {
  if (!blogs.length) {
    return <p>No blogs found.</p>;
  }

  return (
    <ul className="blog-list">
      {blogs.map((blog) => (
        <li key={blog.id} className="blog-item">
          <h3>{blog.title}</h3>
          <p>{blog.body}</p>
        </li>
      ))}
    </ul>
  );
}