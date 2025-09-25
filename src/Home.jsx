import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Missing import
import "./Home.css";


import womenImage from "./assests/Images/Women.jpg";
import newImage from "./assests/Images/New.jpg";
import menImage from "./assests/Images/men.jpg"; // Make sure this exists

function Home() {
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSubtitle(true);
    }, 2000); // Show subtitle after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const products = [
  {
    id: 1,
    name: 'YES Tee',
    price: 499,
    image: '/images/tee1.png'
  },
  {
    id: 2,
    name: 'Sunset Tee',
    price: 599,
    image: '/images/tee2.png'
  },
  {
    id: 3,
    name: 'Whatever Tee',
    price: 699,
    image: '/images/tee3.png'
  },
  {
    id: 4,
    name: 'Smile Tee',
    price: 799,
    image: '/images/tee4.png'
  },
  {
    id: 5,
    name: 'Chill Vibes',
    price: 850,
    image: '/images/tee5.png',
     bestseller: true
  },
  {
    id: 6,
    name: 'Retro Palm',
    price: 950,
    image: '/images/tee6.png'
  },
  {
    id: 7,
    name: 'Ocean Mood',
    price: 1050,
    image: '/images/tee7.png'
  },
  {
    id: 8,
    name: 'Peace Tee',
    price: 1150,
    image: '/images/tee8.png',
     bestseller: true
  },
  {
    id: 9,
    name: 'Ocean Mood',
    price: 1050,
    image: '/images/m2.png'
  },
  {
    id: 10,
    name: 'Ocean Mood',
    price: 1050,
    image: '/images/m3.png'
  },
  
];

  return (
    <section className="hero-container">
      {/* Title and Delayed Subtitle */}
      <div className="hero-title">
        <h1>T SHOP</h1>
        {showSubtitle && (
          <div className="hero-subtitle">There’s One for Everyone</div>
        )}
      </div>

      {/* Image Grid */}
      <div className="hero-grid">
        {/* Shop Women */}
        <Link to="/women" className="hero-item-link">
          <div className="hero-item">
            <img src={womenImage} alt="Shop Women" />
            <div className="overlay">
              <span>Shop Women</span>
            </div>
          </div>
        </Link>

        {/* Shop New */}
        <Link to="/new" className="hero-item-link">
          <div className="hero-item">
            <img src={newImage} alt="Shop New" />
            <div className="overlay">
              <span>Shop New</span>
            </div>
          </div>
        </Link>

        {/* Shop Men */}
        <Link to="/Men" className="hero-item-link">
          <div className="hero-item">
            <img src={menImage} alt="Shop Men" />
            <div className="overlay">
              <span>Shop Men</span>
            </div>
          </div>
        </Link>
      </div>


      <h1>New Drops</h1>
        <main className="products" style={{marginLeft:'60px'}}>
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="image-container">
                {product.bestseller && <span className="bestseller-label">Bestseller</span>}
                <img src={product.image} alt={product.name} />
              </div>
              <h4>{product.name}</h4>
              <p>₹{product.price}</p>
              
            </div>

          ))}
        </main>
  </section>
  );
  
}

export default Home;
