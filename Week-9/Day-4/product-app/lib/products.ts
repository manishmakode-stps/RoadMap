export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
};

const products: Product[] = [
  { id: 1, name: "Wireless Mouse", category: "Accessories", price: 24.99, inStock: true },
  { id: 2, name: "Mechanical Keyboard", category: "Accessories", price: 89.0, inStock: true },
  { id: 3, name: "27-inch Monitor", category: "Displays", price: 219.5, inStock: false },
  { id: 4, name: "USB-C Hub", category: "Adapters", price: 39.99, inStock: true }
];

export function getAllProducts(): Product[] {
  return [...products];
}
