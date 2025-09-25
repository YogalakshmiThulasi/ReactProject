import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const API_URL = "https://68a6f111639c6a54e9a066dd.mockapi.io/Test" // 🔗 replace with real API

function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // ✅ Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(
        `${API_URL}/users?username=${username}&password=${password}`
      );
      const data = await res.json();

      if (data.length > 0) {
        setUser(data[0]);
        setShowLogin(false);
      } else {
        alert("Invalid credentials or user does not exist!");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  // ✅ Handle signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch(`${API_URL}/users?username=${username}`);
      const exists = await res.json();

      if (exists.length > 0) {
        alert("User already exists!");
        return;
      }

      const newUser = { username, password };
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      alert("Signup successful! Please login.");
      setShowLogin(true);
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  // ✅ Add to cart and wishlist
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      {/* Top banner */}
      <div className="top-banner">
        Sale is on! 25% off sitewide using <b>TEES25</b> at checkout
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Link to="/">T SHOP</Link>
        </div>

        <div className="nav-links">
          <Link to="/new" className="active">New</Link>
          <Link to="/women" className="active">Women</Link>
          <Link to="/men" className="active">Men</Link>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="welcome">Hi, {user.username}</span>
              <button className="logout-btn" onClick={() => setUser(null)}>Logout</button>
            </>
          ) : (
            <button className="login-btn" onClick={() => setShowLogin(true)}>
              <span className="icon">👤</span> Log In
            </button>
          )}

          <span className="wishlist-btn" onClick={() => setShowWishlist(!showWishlist)}>❤️</span>
          <span className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛍 <span className="cart-count">{cart.length}</span>
          </span>
        </div>
      </nav>

      {/* Wishlist Popup */}
      {showWishlist && (
        <div className="popup">
          <button className="close" onClick={() => setShowWishlist(false)}>✖</button>
          <h3>Wishlist</h3>
          {wishlist.length > 0 ? (
            wishlist.map((item) => (
              <div key={item.id}>
                <img src={item.image} alt={item.name} width="50" />
                {item.name}
              </div>
            ))
          ) : (
            <p>No items in wishlist</p>
          )}
        </div>
      )}

      {/* Cart Popup */}
      {showCart && (
        <div className="popup">
          <button className="close" onClick={() => setShowCart(false)}>✖</button>
          <h3>Cart</h3>
          {cart.length > 0 ? (
            <>
              {cart.map((item, i) => (
                <div key={i}>
                  <img src={item.image} alt={item.name} width="50" />
                  {item.name} - ₹{item.price}
                </div>
              ))}
              <h4>Total: ₹{calculateTotal()}</h4>
              <button
                className="btn"
                onClick={() =>
                  alert("Dispatching order of ₹" + calculateTotal())
                }
              >
                Dispatch
              </button>
            </>
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      )}

      {/* Login/Signup Popup */}
      {showLogin && (
        <div className="popup-overlay">
          <div className="popup login-popup">
            <button className="close" onClick={() => setShowLogin(false)}>✖</button>
            <h2 className="login-title">{isSignup ? "SIGN UP" : "USER LOGIN"}</h2>

            <form onSubmit={isSignup ? handleSignup : handleLogin}>
              <div className="input-box">
                <span className="icon">👤</span>
                <input name="username" placeholder="Username" required />
              </div>
              <div className="input-box">
                <input name="password" type="password" placeholder="Password" required />
                <span className="icon">🔒</span>
              </div>
              <button className="popup-login-btn" type="submit">
                {isSignup ? "SIGN UP" : "LOGIN"}
              </button>
            </form>

            <p className="toggle-text">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <br /><br />
              <span className="toggle-link" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? "Login" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
