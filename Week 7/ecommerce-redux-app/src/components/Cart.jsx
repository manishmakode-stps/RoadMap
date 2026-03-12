import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";

function Cart() {

  const cart = useSelector(selectCart);

  return (
    <div style={{ border: "2px solid blue", padding: "15px", margin: "20px" }}>
      <h2>Cart</h2>

      <p>Total Items: {cart.totalQuantity}</p>

      {Object.values(cart.items).map(item => (
        <p key={item.productId}>
          Product ID: {item.productId} | Quantity: {item.quantity}
        </p>
      ))}
    </div>
  );
}

export default Cart;