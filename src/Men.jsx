import React, { useState } from 'react';
import './New.css';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'MEN Tee-1',
    price: 499,
    image: '/images/m1.png'
  },
  {
    id: 2,
    name: 'MEN Tee-2',
    price: 599,
    image: '/images/m2.png'
  },
  {
    id: 3,
    name: 'MEN Tee-3',
    price: 699,
    image: '/images/m3.png'
  },
  {
    id: 4,
    name: 'MEN Tee-4',
    price: 799,
    image: '/images/m4.png'
  },
  {
    id: 5,
    name: 'MEN Tee-5',
    price: 850,
    image: '/images/tee6.png',
     bestseller: true
  },
  {
    id: 6,
    name: 'MEN Tee-6',
    price: 950,
    image: '/images/tee7.png'
  },
  {
    id: 7,
    name: 'MEN Tee-7',
    price: 1050,
    image: '/images/tee8.png'
  },
  {
    id: 8,
    name: 'MEN Tee-8',
    price: 1150,
    image: '/images/tee1.png',
     bestseller: true
  }
];

const NewDrops = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="new-drops-container">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Men</span>
      </nav>

      <h1>Men</h1>

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
  <h4>{product.name}</h4>
  <p>₹{product.price}</p>
  <button onClick={() => addToCart(product)}>Add to Cart</button>
</div>

          ))}
        </main>
      </div>
    </div>
  );
};

export default NewDrops;
