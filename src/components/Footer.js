// src/components/Footer.js
import React from 'react';
import './Footer.css'; // Make sure you have this CSS file for styling
import exclusivesIcon from '../assets/exclusives-icon.svg';
import firstDibsIcon from '../assets/first-dibs-icon.svg';
import largestArrayIcon from '../assets/largest-array-icon.svg';

const Footer = () => (
  <footer className="footer">
    <h2>Why Buy From Shop-Savvy</h2>
    <div className="footer-sections">
      <div className="footer-section">
        <img src={firstDibsIcon} alt="First Dibs Icon" className="footer-icon" />
        <h3>Get First Dibs</h3>
        <p>Be the first to get our most anticipated products right when they release.</p>
      </div>
      <div className="footer-section">
        <img src={largestArrayIcon} alt="Largest Array Icon" className="footer-icon" />
        <h3>The Largest Array of Products</h3>
        <p>Shop-Savvy offers an unmatched collection of products you won't find anywhere else.</p>
      </div>
      <div className="footer-section">
        <img src={exclusivesIcon} alt="Exclusive Gear Icon" className="footer-icon" />
        <h3>Exclusive Deals and Swag</h3>
        <p>Access limited edition items and exclusive deals available only on Shop-Savvy.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
