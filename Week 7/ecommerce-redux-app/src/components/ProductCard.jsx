import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice";

function ProductCard({ product }) {

  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const cartItem = cart.items[product.id];

  return (
    <div style={{ border: "1px solid gray", padding: "15px", margin: "15px", width: "250px" }}>

      <img
        src={product.image}
        alt={product.title}
        style={{ width: "120px" }}
      />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <p>Rating: {product.rating.rate} ⭐</p>

      {cartItem && (
        <p>Quantity in Cart: {cartItem.quantity}</p>
      )}

      <button onClick={() => dispatch(addToCart(product.id))}>
        Add to Cart
      </button>

      {cartItem && (
        <button onClick={() => dispatch(removeFromCart(product.id))}>
          Remove
        </button>
      )}

    </div>
  );
}

export default ProductCard;