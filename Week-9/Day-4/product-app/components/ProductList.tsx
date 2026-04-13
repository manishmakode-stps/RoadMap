import type { Product } from "../lib/products";

type ProductListProps = {
  products: Product[];
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(price);
}

export default function ProductList({ products }: ProductListProps) {
  if (!products.length) {
    return <p>No products available.</p>;
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product.id} className="product-item">
          <h3>{product.name}</h3>
          <p>Category: {product.category}</p>
          <p>Price: {formatPrice(product.price)}</p>
          <p>Status: {product.inStock ? "In stock" : "Out of stock"}</p>
        </li>
      ))}
    </ul>
  );
}
