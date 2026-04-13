import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Blog App</title>
        <meta name="description" content="A simple blog built with Next.js and TypeScript." />
      </Head>

      <div className="app-shell">
        <header className="topbar">
          <div className="container topbar-inner">
            <Link href="/" className="brand">
              Blog App
            </Link>
            <nav className="topnav" aria-label="Main navigation">
              <Link href="/blogs">Posts</Link>
            </nav>
          </div>
        </header>

        <Component {...pageProps} />

        <footer className="footer">
          <div className="container">Built with Next.js Pages Router</div>
        </footer>
      </div>
    </>
  );
}
