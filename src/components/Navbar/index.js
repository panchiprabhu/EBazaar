import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

export default function Navbar(props) {
  return (
    <>
      <div className="navbar">
        <div className="navbar_links">
          <div className="navbar_logo">
            <img id="logo" src="/logo.png" alt="EBazaar" />
          </div>
          <Link to="/">Home</Link>
          <Link to="/cart">Shopping Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          {props.isSignedIn ? (
            <>
            </>
          ) : (
            <>
              {/* If user is not signed in, show login and signup links */}
              <Link to="/login">Sign Up/Log In</Link>
            </>
          )}
        </div>
        <div className="navbar_cart">
          <Link to="/cart">
            <span className="cartlogo_badge">
              {props.cart.length > 0 ? (
                <span className="cartlogo_badge">{props.cart.length}</span>
              ) : (
                "0"
              )}
            </span>
          </Link>
          <span className="cartlogo_badge">
            {props.isSignedIn ? props.userName : "Guest"}
          </span>
        </div>
      </div>
    </>
  );
}

