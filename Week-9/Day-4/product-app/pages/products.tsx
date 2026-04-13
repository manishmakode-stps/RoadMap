import type { GetServerSideProps } from "next";
import Link from "next/link";
import ProductList from "../components/ProductList";
import type { Product } from "../lib/products";

type ProductsApiResponse = {
  message: string;
  total: number;
  data: Product[];
};

type ProductsPageProps = {
  products: Product[];
  source: string;
};

export default function ProductsPage({ products, source }: ProductsPageProps) {
  return (
    <main className="container">
      <h1>Products</h1>
      <p className="muted">Source: {source}</p>
      <ProductList products={products} />
      <Link href="/">Back to home</Link>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async ({ req }) => {
  const hostHeader = req.headers.host;
  const host = Array.isArray(hostHeader) ? hostHeader[0] : hostHeader ?? "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  try {
    const response = await fetch(`${baseUrl}/api/products`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const payload: ProductsApiResponse = await response.json();

    return {
      props: {
        products: payload.data,
        source: "/api/products"
      }
    };
  } catch {
    return {
      props: {
        products: [],
        source: "fallback (request failed)"
      }
    };
  }
};
