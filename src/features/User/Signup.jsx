import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../components/Header";
import { registerUser, registerFormErrorReset } from "./userSlice";
import "./Signup.css";

const Signup = () => {
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const inputChangeHandler = (event, type) => {
    const { value } = event.target;

    dispatch(registerFormErrorReset());

    if (type === "username") {
      setUsername(value);
    }
    if (type === "email") {
      setEmail(value);
    }
    if (type === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      emailId: email,
      phoneNumber: phoneNumber,
    };

    dispatch(registerUser(newUser));

    setUsername("");
    setEmail("");
    setPhoneNumber("");
  };

  return (
    <>
      <Header />
      <main className="signup-hero">
        <section className="signup-container">
          <h1>Register</h1>
          <h3>Create an account to get started! ⭐</h3>
          {user && (
            <div>
              <p>Registered successfully.</p>
              <NavLink to="/products">Exlpore our range of products.</NavLink>
            </div>
          )}
          {!user && (
            <form onSubmit={handleSubmit} className="signup-form">
              <label htmlFor="usernameInput">Username:</label>
              <input
                value={username}
                minLength={5}
                onChange={(e) => inputChangeHandler(e, "username")}
                type="text"
                id="usernameInput"
              />
              {error && error.error && !error.error.username && (
                <p>Username already taken.</p>
              )}
              {error &&
                error.error &&
                error.error.username &&
                error.error.username && <p>Please enter a valid username</p>}
              <label htmlFor="emailInput">Email:</label>
              <input
                value={email}
                onChange={(e) => inputChangeHandler(e, "email")}
                type="email"
                id="emailInput"
              />
              {error && error.error && error.error.emailId && (
                <p>Please enter a valid email id.</p>
              )}
              <label htmlFor="phoneNumberInput">Phone Number:</label>
              <input
                value={phoneNumber}
                onChange={(e) => inputChangeHandler(e, "phoneNumber")}
                type="text"
                id="phoneNumberInput"
                minLength={10}
                maxLength={10}
              />
              {error && error.error && error.error.phoneNumber && (
                <p>Please enter a valid phoneNumber</p>
              )}
              <button
                disabled={loading === "loading"}
                type="submit"
                className="register-btn"
              >
                Register
              </button>
            </form>
          )}
          {!user && (
            <p>
              Already Registered? <NavLink to="/login">Login</NavLink>
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Signup;
