import React, { useState, useEffect } from 'react';
import './Header.css';
import { auth } from '../../services/FirebaseConfig';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="header">
      <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <ul className={`nav-links left ${menuActive ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/support">Support</a></li>
        </ul>
        <ul className={`nav-links right ${menuActive ? 'active' : ''}`}>
          {user ? (
            <>
              <li>{user.email}</li>
              <li>
                <button onClick={handleLogout} className="button-link">Logout</button>
              </li>
              <li className="profile-icon">
                <a href="/profile">
                  <img src={`${process.env.PUBLIC_URL}/account.png`} alt="Profile" />
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a href="/login" className="button-link">Login</a>
              </li>
              <li>
                <a href="/register" className="button-link">Signup</a>
              </li>
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
