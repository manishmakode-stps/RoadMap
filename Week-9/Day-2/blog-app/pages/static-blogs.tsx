import type { GetStaticProps } from "next";
import Link from "next/link";
import BlogList from "../components/BlogList";
import { fetchBlogs, type Blog } from "../lib/fetchBlogs";

type StaticBlogsPageProps = {
  blogs: Blog[];
  generatedAt: string;
};

export default function StaticBlogsPage({ blogs, generatedAt }: StaticBlogsPageProps) {
  return (
    <main className="container">
      <h1>Static Blogs (getStaticProps)</h1>
      <p className="muted">Built at: {generatedAt}</p>
      <p>
        This page uses <code>getStaticProps</code> and <code>revalidate: 60</code>
        to demonstrate ISR.
      </p>
      <BlogList blogs={blogs} />
      <Link href="/">Back to home</Link>
    </main>
  );
}

export const getStaticProps: GetStaticProps<StaticBlogsPageProps> = async () => {
  const blogs = await fetchBlogs();

  return {
    props: {
      blogs,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 60,
  };
};