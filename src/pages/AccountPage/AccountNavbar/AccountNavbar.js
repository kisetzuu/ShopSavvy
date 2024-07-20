import React from 'react';
import { Link } from 'react-router-dom';
import './AccountNavbar.css'; // Ensure you have appropriate styling

const AccountNavbar = () => {
  return (
    <nav className='account-navbar'>
      <ul>
        <li><Link to="/account/general">General Settings</Link></li>
        <li><Link to="/account/security">Security Settings</Link></li>
      </ul>
    </nav>
  );
};

export default AccountNavbar;
