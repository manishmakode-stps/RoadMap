import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <h1>Product API Demo</h1>
      <p>This project demonstrates Next.js API Routes using a mocked products endpoint.</p>
      <div className="link-row">
        <Link href="/products">View products page</Link>
        <a href="/api/products" target="_blank" rel="noreferrer">
          Open /api/products JSON
        </a>
      </div>
    </main>
  );
}
