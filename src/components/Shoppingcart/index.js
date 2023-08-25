import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import data from "../../data/data";
import "./style.css";

function Shopping(props) {
  const cartItems = props.cart;
  const [quantities, setQuantities] = React.useState({});
  const [checkoutClicked, setCheckoutClicked] = React.useState(false);
  const navigate = useNavigate();

  const updateQuantity = (productId, newQuantity) => {
    // do not allow quantity to be less than 1
    if (newQuantity < 1) {
      newQuantity = 1;
    }
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const handleCheckout = () => {
    if (props.isSignedIn) {
      setCheckoutClicked(true);
    } else {
      setCheckoutClicked(false);
      navigate("/login");
    }
  };

  if (checkoutClicked && props.isSignedIn) {
    return <Navigate to="/checkout" />;
  }

  return (
    <div className="shopping-container">
      <h1 style={{ marginBottom: "20px" }}>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <div className="cart-items">
          {cartItems.map((productId) => {
            const product = data.find((item) => item.id === productId);

            if (!product) {
              return null;
            }

            const productQuantity = quantities[productId] || 1;

            return (
              <div key={product.id} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-image">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-info">
                    <p>₹{product.price}</p>
                  </div>
                  <div className="cart-item-total">
                    <span>Qty: </span>
                    <input
                      className="cart-item-quantity"
                      type="number"
                      value={productQuantity}
                      onChange={(event) =>
                        updateQuantity(product.id, event.target.value)
                      }
                    />
                    <p>₹{product.price * productQuantity}</p>
                  </div>
                </div>
                <button
                  className="remove-from-cart-button"
                  onClick={() => props.removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-total-container">
          <p className="cart-total">
            Total: ₹
            {cartItems.reduce((total, productId) => {
              const product = data.find((item) => item.id === productId);
              const productQuantity = quantities[productId] || 1;
              return total + product.price * productQuantity;
            }, 0)}
          </p>
          <div className="checkout-button-container">
            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shopping;
