import React, { useState, useContext } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../services/FirebaseConfig';
import { AuthContext, ProfileContext, CartContext } from '../../services/Contexts';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const { user } = useContext(AuthContext);
  const { profilePicture } = useContext(ProfileContext);
  const { balance } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleBalanceClick = () => {
    navigate('/payment-portal');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={`${process.env.PUBLIC_URL}/ShopSavvy_Logo.png`} alt="ShopSavvy Logo" className="logo" />
      </div>
      <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <ul className={`nav-links left ${menuActive ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/support">Support</Link></li>
          {user && (
            <>
              <li><Link to="/user-listings">Listings</Link></li>
            </>
          )}
        </ul>
        <ul className={`nav-links right ${menuActive ? 'active' : ''}`}>
          {user ? (
            <>
              <li>{user.email}</li>
              <li><span className="balance" onClick={handleBalanceClick}>Balance: ${balance !== null ? balance : 'Loading...'}</span></li>
              <li>
                <button onClick={handleLogout} className="button-link">Logout</button>
              </li>
              <li className="profile-icon">
                <Link to="/account">
                  {profilePicture ? (
                    <img src={profilePicture} alt="Profile" />
                  ) : (
                    <img src={`${process.env.PUBLIC_URL}/account.png`} alt="Profile" />
                  )}
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="button-link">Login</Link></li>
              <li><Link to="/register" className="button-link">Signup</Link></li>
            </>
          )}
        </ul>
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
