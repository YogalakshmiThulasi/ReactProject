import React, { useState, useEffect } from "react"; // Added useEffect import
import { Link } from "react-router-dom";
import "./Navbar.css";

const API_URL = "https://68a6f111639c6a54e9a066dd.mockapi.io/Test"; // Your MockAPI endpoint

function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [signupError, setSignupError] = useState(""); // Added missing signupError state

  // Load logged-in user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    try {
      // Fetch all users
      const res = await fetch(`${API_URL}`);
      if (!res.ok) {
        throw new Error("Network response was not ok: " + res.status);
      }
      const users = await res.json();

      // Find user by username + password
      const found = users.find(
        (u) => u.username === username && u.password === password
      );

      if (found) {
        setUser(found);
        localStorage.setItem("user", JSON.stringify(found));
        setShowLogin(false);
      } else {
        setLoginError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong during login");
    }
  };

  // Signup handler
  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError("");

    const username = e.target.username.value.trim();
    const password = e.target.password.value;

    try {
      // Fetch all users
      const res = await fetch(`${API_URL}`);
      if (!res.ok) {
        throw new Error("Network response was not ok: " + res.status);
      }
      const users = await res.json();

      // Check if username already exists
      const exists = users.find((u) => u.username === username);
      if (exists) {
        setSignupError("Username already exists");
        return;
      }

      // Create new user
      const newUser = { username, password };
      const createRes = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (!createRes.ok) {
        throw new Error("Failed to create user: " + createRes.status);
      }
      const created = await createRes.json();

      // Auto-login after signup
      setUser(created);
      localStorage.setItem("user", JSON.stringify(created));
      setShowLogin(false);
    } catch (err) {
      console.error("Signup error:", err);
      setSignupError("Something went wrong during signup");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  // Add to cart
  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  // Calculate cart total price
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
              <span className="welcome">Welcome, {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <button className="login-btn" onClick={() => {
              setShowLogin(true);
              setIsSignup(false);
              setLoginError("");
              setSignupError("");
            }}>
              <span className="icon">👤</span> Log In
            </button>
          )}

          <span
            className="wishlist-btn"
            onClick={() => setShowWishlist(!showWishlist)}
          >
            ❤️
          </span>
          <span className="cart-btn" onClick={() => setShowCart(!showCart)}>
            🛍 <span className="cart-count">{cart.length}</span>
          </span>
        </div>
      </nav>

      {/* Wishlist Popup */}
      {showWishlist && (
        <div className="popup">
          <button className="close" onClick={() => setShowWishlist(false)}>
            ✖
          </button>
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
            <button className="close" onClick={() => setShowLogin(false)}>
              ✖
            </button>
            <h2 className="login-title">{isSignup ? "SIGN UP" : "USER LOGIN"}</h2>

            <form onSubmit={isSignup ? handleSignup : handleLogin}>
              <div className="input-box">
                <span className="icon">👤</span>
                <input name="username" placeholder="Username" required />
              </div>
              <div className="input-box">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                <span className="icon">🔒</span>
              </div>

              {isSignup && signupError && (
                <p style={{ color: "red" }}>{signupError}</p>
              )}
              {!isSignup && loginError && (
                <p style={{ color: "red" }}>{loginError}</p>
              )}

              <button className="popup-login-btn" type="submit">
                {isSignup ? "SIGN UP" : "LOGIN"}
              </button>
            </form>

            <p className="toggle-text">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <br />
              <br />
              <span
                className="toggle-link"
                onClick={() => {
                  setIsSignup(!isSignup);
                  setLoginError("");
                  setSignupError("");
                }}
              >
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
