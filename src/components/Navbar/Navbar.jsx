import './Navbar.css';
import { Link } from "react-router-dom";
import React, { useState }  from 'react';
import Logo from "../../../src/images/logo/logo.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomerService from '../../services/CustomerService';
import CarRentalSearch from '../common/CarRental/CarRentalSearch';

function Navbar({onUsernameChange}){
    const [isRegisterPopupVisible, setIsRegisterPopupVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [passwordHash, setPasswordHash] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showSignInPopup, setShowSignInPopup] = useState(false);
    const [signInError, setSignInError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticatedUsername, setAuthenticatedUsername] = useState('');
    const [isConfirmBookingPopupVisible, setIsConfirmBookingPopupVisible] = useState(false);


    const toggleRegisterPopup = () => {
      setIsRegisterPopupVisible(!isRegisterPopupVisible);
      };

    const ageInt = parseInt(age, 10); 

    const toggleSignInPopup = () => {
        setShowSignInPopup(!showSignInPopup);
      }; 
      
      const handleSignIn = async (event) => {
        event.preventDefault();
        setSignInError('');
        try{
          const response = await CustomerService.signIn(username,passwordHash);
          if (response.data.isValid) {
            setAuthenticatedUsername(username);
            setIsAuthenticated(true);
            setShowSignInPopup(false);
            onUsernameChange(username);
            console.log('User is valid');
            // Handle successful sign-in, e.g., redirect to a user dashboard
          } else {
            setSignInError('Invalid username or password');
            // Show an error message
          }
        }catch (error) {
          console.error('Error during sign in:', error);
          setSignInError('An error occurred during sign-in');
          // Show an error message
        }
        // Here you would authenticate the user
        console.log('Username:', username, 'Password:', passwordHash);
        // If authentication is successful, you can do additional actions here
      };  

    const handleRegister = async (event) => {
        event.preventDefault(); 
      
    const customerData = {
          username,
          passwordHash, // Make sure to hash this before sending in a real app
          email,
          firstName,
          lastName,
          phoneNumber,
          age :ageInt,
          address,
          zipCode
          // Include other data fields here
    };
    
    
    try {
      // Call the addCustomer function from your CustomerService.js
      const response = await CustomerService.addCustomer(customerData);
      if (response.status === 201) {
        console.log('Customer added successfully');
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          setIsRegisterPopupVisible(false); // Close the form after showing the success message
      }, 5000);
        // Handle successful addition, e.g., clear form, show message, etc.
      } else {
        console.error('Failed to add customer');
        // Handle failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error, e.g., show an error message to the user
    }
    setIsRegisterPopupVisible(false); 
  };
    
  
    
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={Logo} alt="logo-img" />
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/admin">
                Admin
              </Link>
            </li>
            <li>
              {" "}
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
          {isAuthenticated ? (
            <span className="navbar-text">
                                Welcome, {authenticatedUsername}
              </span>
                ) : (
                <button className="btn btn-primary btn-lg btn-register-large" onClick={toggleSignInPopup}>Sign In</button>
            )} 
          {showSignInPopup && (
              <div className="modal show d-block" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Sign In</h5>
                      <button type="button" className="close" onClick={toggleSignInPopup} aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSignIn}>
                        <div className="form-group">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="passwordHash">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="passwordHash"
                            value={passwordHash}
                            onChange={(e) => setPasswordHash(e.target.value)}
                            required
                          />
                        </div>
                        {signInError && <div className="alert alert-danger">{signInError}</div>}
                        <button type="submit" className="btn btn-primary">Sign In</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          <button className="btn btn-primary btn-lg btn-register-large" onClick={toggleRegisterPopup}>Register</button>
            {isRegisterPopupVisible && (
         <div className="modal show d-block" tabIndex="-1" role="dialog">
         <div className="modal-dialog" role="document">
           <div className="modal-content">
            
             <div className="popup-container">
             <div className="popup">
             <form onSubmit={handleRegister}>
             <div className="modal-header">
               <h2 className="modal-title">Register</h2>
             </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                />
                <input
                type="password"
                value={passwordHash}
                onChange={(e) => setPasswordHash(e.target.value)}
                placeholder="Password"
                required
                />
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  required
                />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone Number"
                  required
                />
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Age"
                  required
                />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Address"
                  required
                />
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip Code"
                  required
                />
              <button type="button" onClick={toggleRegisterPopup} className="close-button">Close</button>
              <button type="submit" onClick={handleRegister} className="submit-button">Submit</button>
               </form>
             </div>
             </div>
           </div>
         </div>
         
       </div>
       
      )}
          </div>
          </div>
            
      </nav>

      {isConfirmBookingPopupVisible && (
      <CarRentalSearch
        username={setAuthenticatedUsername} 
      />
      )}

      {showSuccessMessage && (
        <div className="registration-success-popup">
          <h2>User Registered</h2>
        </div>
        )}
            
            
        </>
        
        
    );
}

export default Navbar;



