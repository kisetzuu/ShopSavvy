import React, { useState, useEffect } from 'react';
import './Header.css';
import { auth } from '../../services/FirebaseConfig';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Handle search functionality here, e.g., filtering results, making API calls, etc.
  };

  return (
    <header className="header">
      <nav className={`nav ${menuActive ? 'active' : ''}`}>
        <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/cart">Cart</a></li>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit">Search</button>
          </div>
          {user ? (
            <>
              <li>{user.email}</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <li>
              <a href="/login">Login</a>
            </li>
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
