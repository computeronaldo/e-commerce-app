import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { loginUser, loginFormErrorReset } from "./userSlice.js";
import Header from "../../components/Header";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const message = location.state;
  
  const [username, setUsername] = useState("");

  const { user, error } = useSelector((state) => state.user);
  
  const handleInputChange = (value) => {
    setUsername(value);

    dispatch(loginFormErrorReset());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginUser(username));
    setUsername("");
  };

  return (
    <>
      <Header />
      <main className="login-hero">
        <section className="login-container">
          <h1>Login</h1>
          <h3>Hi, Welcome Back 👋</h3>
          {user && (
            <p>
              You are logged in.{" "}
              <NavLink to="/products">Explore products.</NavLink>
            </p>
          )}
          {!user && (
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="usernameInput">Username:</label>
              <input
                value={username}
                onChange={(e) => handleInputChange(e.target.value)}
                type="text"
                id="usernameInput"
              />
              {error && <p>{error.error}</p>}
              <button className="login-form-btn" type="submit">
                Login
              </button>
            </form>
          )}
          {!user && message && <p className="login-message-alert">{message}</p>}
          {!user && (
            <p>
              Not registered yet?{" "}
              <NavLink to="/signup">Create an account</NavLink>
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Login;
