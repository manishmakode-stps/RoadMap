import type { GetStaticProps } from "next";
import BlogList from "../../components/BlogList";
import { getAllPosts, type BlogPost } from "../../lib/blogs";

type BlogsPageProps = {
  posts: BlogPost[];
};

export default function BlogsPage({ posts }: BlogsPageProps) {
  return (
    <main className="container page">
      <section className="page-header">
        <p className="eyebrow">Latest Posts</p>
        <h1>Developer Blog</h1>
        <p className="lead">Insights on routing, rendering, and building better frontend experiences.</p>
      </section>
      <BlogList posts={posts} />
    </main>
  );
}

export const getStaticProps: GetStaticProps<BlogsPageProps> = async () => {
  const posts = getAllPosts();

  return {
    props: { posts },
    revalidate: 60,
  };
};
