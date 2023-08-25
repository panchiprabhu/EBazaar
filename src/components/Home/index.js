import React from "react";
import ItemCard from "../ItemCard";
import data from "../../data/data";
import './style.css';

function Home(props) {
    const cartItems = props.cart;
    const setCartItems = props.setCart;
    const wishlistItems = props.wishlist;
    const setWishlistItems = props.setWishlist;
    const removeFromCart = props.removeFromCart;
    const removeFromWishlist = props.removeFromWishlist;

    return (
      <div className="product_grid">
        {data.map((product) => (
          <ItemCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            img={product.img}
            addToCart={setCartItems}
            removeFromCart={removeFromCart} 
            cartItems={cartItems}
            setCartCount={props.setCartCount}
            wishlistItems={wishlistItems}
            addToWishlist={setWishlistItems}
            removeFromWishlist={removeFromWishlist}
          />          
        ))}
      </div>
      );
  }  

export default Home;