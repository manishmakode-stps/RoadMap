import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectAuth } from "./features/auth/authSlice";
import { fetchProducts } from "./features/products/productSlice";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (auth.isAuthenticated && !products.loading && products.allIds.length === 0) {
      dispatch(fetchProducts());
    }
  }, [auth.isAuthenticated, dispatch, products.allIds.length, products.loading]);

  if (!auth.isAuthenticated) {
    return <Login />;
  }

  if (products.loading) {
    return <p>Loading products...</p>;
  }

  if (products.error) {
    return <p>Error: {products.error}</p>;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>E-Commerce Redux App</h1>
          <p>Signed in as {auth.user?.name}</p>
        </div>

        <button type="button" onClick={() => dispatch(logout())}>
          Logout
        </button>
      </header>

      <Cart />
      <ProductList />
    </div>
  );
}

export default App;
