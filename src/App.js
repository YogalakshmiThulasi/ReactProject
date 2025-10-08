import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import New from './New';
import Men from './Men';
import Women from './Women';
import Home from './Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 🔁 Make sure this is included
import Footer from './Footer';

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar
        wishlist={wishlist}
        cart={cart}
        setWishlist={setWishlist}
        setCart={setCart}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/new"
          element={
            <New
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/women"
          element={
            <Women
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/men"
          element={
            <Men
              wishlist={wishlist}
              setWishlist={setWishlist}
              cart={cart}
              setCart={setCart}
            />
          }
        />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
     <Footer/>
    </Router>
  );
}

export default App;
