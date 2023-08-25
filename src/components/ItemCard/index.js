import React from "react";
import "./style.css";

function ItemCard(props) {
  const isItemInCart = props.cartItems.includes(props.id);
  const isItemInWishlist = props.wishlistItems.includes(props.id);

  const toggleCart = () => {
    if (isItemInCart) {
      props.removeFromCart(props.id);
    } else {
      props.addToCart([...props.cartItems, props.id]);
    }
  };

  const toggleWishlist = () => {
    if (isItemInWishlist) {
      props.removeFromWishlist(props.id);
    } else {
      props.addToWishlist([...props.wishlistItems, props.id]);
    }
  };

  return (
    <div className="Item_container" style={{ marginBottom: "90px" }}>
    <div className="item_card">
      <div className="item_card_details">
        <img className="item_card_icon" src={props.img} alt={props.name}/>
        <div className="item_card_name">{props.name}</div>
        <div className="item_card_info">
          <p>₹{props.price}</p>
        </div>
      </div>
      <button className='add_to_cart_button' onClick={toggleCart}>
        {isItemInCart ? "Remove from cart" : "Add to cart"}
      </button>
      <button className='add_to_wishlist_button' onClick={toggleWishlist}>
        { isItemInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </button>

    </div>
    </div>
  );
}

export default ItemCard;
