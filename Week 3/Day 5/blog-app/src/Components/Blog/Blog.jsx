import '../../App.css';

const posts = [
  { id: 1, title: "React Hooks Guide", excerpt: "Learn how to use useState and useEffect..." },
  { id: 2, title: "CSS Grid vs Flexbox", excerpt: "Which layout tool should you choose in 2024?" }
];

export default function Blog() {
  return (
    <div className="page-container">
      <h1>Latest Articles</h1>
      <div className="blog-grid">
        {posts.map(post => (
          <div key={post.id} className="blog-card">
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <span className="read-more">Read More &rarr;</span>
          </div>
        ))}
      </div>
    </div>
  );
}
