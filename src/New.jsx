import React from 'react';
import './New.css';
import { Link } from 'react-router-dom';

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
  }
];

const New = ({ wishlist, setWishlist }) => {
  const addToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(item => item.id === product.id);
    if (!exists) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in wishlist!`);
    }
  };

  return (
    <div className="new-drops-container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>New Drops</span>
      </nav>

      <h1>New Drops</h1>

      <div className="sidebar-and-content">
        <aside className="sidebar">
          <h3>Browse by</h3>
          <ul>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/new">New Drops</Link></li>
            <li><Link to="/women">Women</Link></li>
          </ul>

          <h3 className='fil'>Filter by</h3>
          <div className="filters">
            <label><input type="checkbox" /> Large</label>
            <label><input type="checkbox" /> Medium</label>
            <label><input type="checkbox" /> Small</label>
          </div>
        </aside>

        <main className="products">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <div className="image-container">
                {product.bestseller && <span className="bestseller-label">Bestseller</span>}
                <img src={product.image} alt={product.name} />
              </div>
              <h4>
                {product.name}
                <span
                  className="wishlist-emoji"
                  onClick={() => addToWishlist(product)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  title="Add to Wishlist"
                >
                  ❤️
                </span>
              </h4>
              <p>₹{product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
};

export default New;


