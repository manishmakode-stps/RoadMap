import Link from "next/link";

export default function Home() {
  return (
    <main className="container page">
      <section className="hero">
        <p className="eyebrow">Tech Writing Platform</p>
        <h1>Stories and guides for modern web developers.</h1>
        <p className="lead">
          Explore practical posts on Next.js, routing patterns, and production-ready frontend architecture.
        </p>
        <div className="hero-actions">
          <Link href="/blogs" className="button-primary">
            Browse Posts
          </Link>
        </div>
      </section>
    </main>
  );
}
