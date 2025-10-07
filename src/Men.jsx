import React, { useState } from 'react';
import './New.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const products = [
  {
    id: 1,
    name: 'MEN Tee-1',
    price: 499,
    image: '/images/m1.png',
    size: 'Large' 
  },
  {
    id: 2,
    name: 'MEN Tee-2',
    price: 599,
    image: '/images/m2.png',
    size: 'Small' 
  },
  {
    id: 3,
    name: 'MEN Tee-3',
    price: 699,
    image: '/images/m3.png',
    size: 'Large' 
  },
  {
    id: 4,
    name: 'MEN Tee-4',
    price: 799,
    image: '/images/m4.png',
    size: 'Medium'
  },
  {
    id: 5,
    name: 'MEN Tee-5',
    price: 850,
    image: '/images/tee6.png',
     bestseller: true,
     size: 'Medium'
  },
  {
    id: 6,
    name: 'MEN Tee-6',
    price: 950,
    image: '/images/tee7.png',
    size: 'Small' 
  },
  {
    id: 7,
    name: 'MEN Tee-7',
    price: 1050,
    image: '/images/tee8.png',
    size: 'Large' 
  },
  {
    id: 8,
    name: 'MEN Tee-8',
    price: 1150,
    image: '/images/tee1.png',
     bestseller: true,
     size: 'Small' 
  }
];

const Men = ({ wishlist, setWishlist, cart, setCart }) => {
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleWishlist = (product) => {
  const exists = wishlist.find((item) => item.id === product.id);
  if (exists) {
    setWishlist(wishlist.filter((item) => item.id !== product.id));
    toast.info(`${product.name} removed from wishlist`);
  } else {
    setWishlist([...wishlist, product]);
    toast.success(`${product.name} added to wishlist`);
  }
};

const toggleCart = (product) => {
  const exists = cart.find((item) => item.id === product.id);
  if (exists) {
    setCart(cart.filter((item) => item.id !== product.id));
    toast.info(`${product.name} removed from cart`);
  } else {
    setCart([...cart, product]);
    toast.success(`${product.name} added to cart`);
  }
};


  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size) // Remove if already selected
        : [...prev, size]              // Add if not selected
    );
  };

  const filteredProducts = selectedSizes.length === 0
    ? products
    : products.filter(product => selectedSizes.includes(product.size));


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
            <label>
              <input
                type="checkbox"
                value="Large"
                onChange={handleSizeChange}
                checked={selectedSizes.includes("Large")}
              /> Large
            </label>
            <label>
              <input
                type="checkbox"
                value="Medium"
                onChange={handleSizeChange}
                checked={selectedSizes.includes("Medium")}
              /> Medium
            </label>
            <label>
              <input
                type="checkbox"
                value="Small"
                onChange={handleSizeChange}
                checked={selectedSizes.includes("Small")}
              /> Small
            </label>
          </div>
        </aside>

        <main className="products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div className="product-card" key={product.id}>
                <div className="image-container">
                  {product.bestseller && <span className="bestseller-label">Bestseller</span>}
                  <img src={product.image} alt={product.name} />
                </div>
                <h4>
                  {product.name}
                  <span
                    className="wishlist-emoji"
                    onClick={() => toggleWishlist(product)}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    title="Toggle Wishlist"
                  >
                    {wishlist.find(item => item.id === product.id) ? '❤️' : '💔'}
                  </span>
                </h4>
                <p>₹{product.price}</p>
                <button onClick={() => toggleCart(product)}>
                  {cart.find(item => item.id === product.id) ? 'Remove from Cart' : 'Add to Cart'}
                </button>
              </div>
            ))
          ) : (
            <p>No products found for selected size(s).</p>
          )}
        </main>
      </div>
    </div>
  );
};
export default Men;
