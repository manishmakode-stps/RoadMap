import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAllPosts, getPostBySlug, type BlogPost } from "../../lib/blogs";

type BlogDetailsPageProps = {
  post: BlogPost;
};

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BlogDetailsPage({ post }: BlogDetailsPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <main className="container page">
        <p>Loading article...</p>
      </main>
    );
  }

  return (
    <main className="container page">
      <article className="article">
        <p className="meta">
          {formatDate(post.publishedAt)} · {post.readingTime} · By {post.author}
        </p>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <div className="tag-row" aria-label="Article tags">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </article>
      <Link href="/blogs">Back to all posts</Link>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogDetailsPageProps> = async ({ params }) => {
  const slug = params?.slug;

  if (typeof slug !== "string") {
    return { notFound: true };
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 120,
  };
};
