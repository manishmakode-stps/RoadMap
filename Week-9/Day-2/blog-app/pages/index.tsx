import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <h1>Next.js Data Fetching Assignment</h1>
      <p>
        This mini project demonstrates <code>getStaticProps</code> and
        <code> getServerSideProps</code> using a blog list.
      </p>

      <div className="card-grid">
        <article className="card">
          <h2>Static Blogs (SSG + ISR)</h2>
          <p>
            Generated at build time and refreshed in the background with
            revalidation.
          </p>
          <Link href="/static-blogs">Open static page</Link>
        </article>

        <article className="card">
          <h2>Server Blogs (SSR)</h2>
          <p>
            Rendered on every request on the server to keep data fully dynamic.
          </p>
          <Link href="/server-blogs">Open server page</Link>
        </article>
      </div>
    </main>
  );
}