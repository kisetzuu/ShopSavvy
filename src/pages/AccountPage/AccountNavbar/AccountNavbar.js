import React from 'react';
import { Link } from 'react-router-dom';
//import './AccountNavbar.css'

const AccountNavbar = ({ setActiveComponent }) => {
    return (
      <div className="navbar">
        <ul>
          <li><a onClick={() => setActiveComponent('general')}>General Account Settings</a></li>
          <li><a onClick={() => setActiveComponent('security')}>Security Settings</a></li>
        </ul>
      </div>
    );
  }
  
export default AccountNavbar;