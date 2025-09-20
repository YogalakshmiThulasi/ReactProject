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
    </section>
  );
}

export default Home;
