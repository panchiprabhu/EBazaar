import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import './style.css';

const Login = ({ isSignedIn, setIsSignedIn, setUserName}) => {
  const [showSignup, setShowSignup] = useState(false); // Track whether to show the signup form
  const [registeredCredentials, setRegisteredCredentials] = useState(null); // Store registered credentials

  // Function to toggle showing the signup form
  const toggleShowSignup = () => {
    setShowSignup(!showSignup);
  };

  // Function to handle signup form submission
  const handleSignupSubmit = (event) => {
    event.preventDefault();
    // Replace with actual signup logic and store registered credentials
    const email = event.target.email.value;
    const password = event.target.password.value;
    setRegisteredCredentials({ email, password });
    // After successful signup, toggle back to the login form
    toggleShowSignup();
  };

  // Function to handle login form submission
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Replace with actual login logic
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;

    // Check if credentials match the registered user's credentials
    if (
      registeredCredentials &&
      email === registeredCredentials.email &&
      password === registeredCredentials.password
    ) {
      setUserName(name);
      setIsSignedIn(true);
       // Set user as signed in
    }
  };

  return (
    <div className="main">
      {isSignedIn ? (
        // Redirect if the user is signed in
        <Navigate to="/cart" replace={true} />
      ) : (
        <div>
          <div>
            <h1>{showSignup ? "Sign Up" : "Login"}</h1>
            <form
              onSubmit={showSignup ? handleSignupSubmit : handleLoginSubmit}
              className="form-group"
            >
              <div>
                {!showSignup && (
                  <>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required />
                  </>
                )}

                <label htmlFor="email">Email</label>
                <input type="email" id="email" required />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" required />

                {showSignup && (
                  <>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" required />
                  </>
                )}
                <div className='submitcontainer'>
                <button type="submit" className="submitbutton">
                  {showSignup ? "Sign Up" : "Login"}
                </button>
                </div>
              </div>
            </form>
          </div>
          <div>
            <p>
              {showSignup
                ? "Already have an account?"
                : "Don't have an account?"}
              <button onClick={toggleShowSignup} className="toggle">
                {showSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
