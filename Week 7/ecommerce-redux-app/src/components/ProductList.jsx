import { useSelector } from "react-redux";
import { selectAllProducts } from "../features/products/productSlice";
import ProductCard from "./ProductCard";

function ProductList() {

  const products = useSelector(selectAllProducts);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;