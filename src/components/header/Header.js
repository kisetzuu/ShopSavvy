import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
          <li>ShopSavvy</li>
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
          <li><a href="/login">Login</a></li>
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
