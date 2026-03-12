import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import "../App.css";

function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
      setError("Username is required.");
      return;
    }

    dispatch(
      login({
        name: trimmedUsername,
        loggedInAt: new Date().toISOString()
      })
    );

    setError("");
    setUsername("");
  };

  return (
    <form className="login-card" onSubmit={handleLogin}>
      <h2>Login</h2>
      <p>Enter a username to access the store.</p>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(event) => {
          setUsername(event.target.value);

          if (error) {
            setError("");
          }
        }}
      />

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
