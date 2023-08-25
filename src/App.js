import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Shopping from './components/Shoppingcart';
import Wishlist from './components/Wishlist';
import Login from './components/Login/Login';
import Checkout from './components/Checkout';
import React from 'react';


function App() {
  const [cart, setCart] = React.useState([]);
  const [cartCount, setCartCount] = React.useState({});
  const [wishlist, setWishlist] = React.useState([]);
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [userName,setUserName] = React.useState("");


  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [cart, wishlist]);

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((id) => id !== productId);
    setCart(updatedCart);
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
  };

  return (
    <Router>
      <Navbar cart={cart} isSignedIn={isSignedIn} userName={userName}/>
      <Routes>
        <Route path="/" element={<Home
          cart={cart}
          setCart={setCart}
          cartCount={cartCount}
          setCartCount={setCartCount}
          wishlist={wishlist}
          setWishlist={setWishlist}
          removeFromCart={removeFromCart}
          removeFromWishlist={removeFromWishlist}
        />}></Route>
        <Route path="/cart" element={<Shopping
          cart={cart}
          setCart={setCart}
          removeFromCart={removeFromCart}
          isSignedIn={isSignedIn}
        />}></Route>
        {/* wishlist */}
        <Route path="/wishlist" element={<Wishlist
          wishlist={wishlist}
          setWishlist={setWishlist}
          removeFromWishlist={removeFromWishlist}
        />}></Route>
        <Route path='/login' element={<Login
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
          setUserName={setUserName}
        />}></Route>
        <Route
          path="/checkout"
          element={<Checkout cartItems={cart} />} 
        />
      </Routes>
    </Router>
  );

}

export default App;
