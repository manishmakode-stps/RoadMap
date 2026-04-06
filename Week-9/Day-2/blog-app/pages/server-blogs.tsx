import type { GetServerSideProps } from "next";
import Link from "next/link";
import BlogList from "../components/BlogList";
import { fetchBlogs, type Blog } from "../lib/fetchBlogs";

type ServerBlogsPageProps = {
  blogs: Blog[];
  generatedAt: string;
};

export default function ServerBlogsPage({ blogs, generatedAt }: ServerBlogsPageProps) {
  return (
    <main className="container">
      <h1>Server Blogs (getServerSideProps)</h1>
      <p className="muted">Rendered at request time: {generatedAt}</p>
      <p>
        This page uses <code>getServerSideProps</code>, so data is fetched fresh
        on every request.
      </p>
      <BlogList blogs={blogs} />
      <Link href="/">Back to home</Link>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<ServerBlogsPageProps> = async () => {
  const blogs = await fetchBlogs();

  return {
    props: {
      blogs,
      generatedAt: new Date().toISOString(),
    },
  };
};