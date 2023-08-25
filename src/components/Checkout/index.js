import React, { useState } from 'react';
import './style.css'; // Create a corresponding CSS file
import { useNavigate } from 'react-router-dom';
import Emoji from 'react-emoji-render';

function Checkout({ cartItems }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    pincode: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    return /^[0-9]{10}$/.test(phoneNumber);
  };

  const handlePlaceOrder = () => {
    const newErrors = {};
    if (!deliveryDetails.name) {
      newErrors.name = 'Name is required';
    }
    if (!deliveryDetails.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!validatePhoneNumber(deliveryDetails.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }
    if (!deliveryDetails.address) {
      newErrors.address = 'Address is required';
    }
    if (!deliveryDetails.pincode) {
      newErrors.pincode = 'Pincode is required';
    }
    
    if (Object.keys(newErrors).length === 0) {
      // Show order placed animation
      setOrderPlaced(true);

      // Simulate delay and reset animation state
      setTimeout(() => {
        setOrderPlaced(false);
        setTimeout(() => {
          navigate('/'); // Use the navigate function to move to the home page
          setTimeout(() => {
            window.location.reload(); // This will reload the entire app
          }, 200);
        }, 1000);
      }, 6000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <form>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={deliveryDetails.name}
            onChange={handleInputChange}
            placeholder='Full Name'
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={deliveryDetails.phoneNumber}
            onChange={handleInputChange}
            placeholder='10 digits'
          />
          {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
  name="address"
  value={deliveryDetails.address}
  onChange={handleInputChange}
  placeholder='Include City and State'
  rows={4} // You can adjust the number of rows as needed
  style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
/>

          {errors.address && <p className="error-message">{errors.address}</p>}
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={deliveryDetails.pincode}
            onChange={handleInputChange}
          />
          {errors.pincode && <p className="error-message">{errors.pincode}</p>}
        </div>
        <div className="place-order-button-container">
  <button
    className="place-order-button"
    type="button"
    onClick={handlePlaceOrder}
  >
    Place Order
  </button>
</div>
      </form>
      {orderPlaced && (
        <div className="order-animation">
          <Emoji text=":white_check_mark:" className="emoji-animation" />
          <p className='details'>Order Placed!!<br/>
          The items will be delivered to {deliveryDetails.name}<br/>{deliveryDetails.address}<br/>We will contact you at {deliveryDetails.phoneNumber}</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;

