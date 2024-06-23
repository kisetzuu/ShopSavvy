import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">ShopSavvy</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/cart">Cart</a></li>
          <li><a href="/login">Login</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
