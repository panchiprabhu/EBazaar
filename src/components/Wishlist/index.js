import React from 'react';
import data from '../../data/data';
import './style.css';

function Wishlist(props) {
  const cartItems = props.wishlist;
  const removeFromWishlist = props.removeFromWishlist;

  return (
    <div className="shopping-container">
      <h1 style={{marginBottom:"20px"}}>Your Wishlist</h1>
      {cartItems.length === 0 ? (
        <h2>Your wishlist is empty.</h2>
      ) : (
        <div className="cart-items">
          {cartItems.map((productId) => {
            // Find the product details from your data based on productId
            const product = data.find((item) => item.id === productId);

            if (!product) {
              return null; 
            }

            return (
              <div key={product.id} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-image"><img src={product.img} alt={product.name} /></div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-info">
                    <p>₹{product.price}</p>
                  </div>
                </div>
                <button
                  className="remove-from-cart-button"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

