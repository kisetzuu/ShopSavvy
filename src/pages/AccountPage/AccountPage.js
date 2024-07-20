import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AccountNavbar from './AccountNavbar/AccountNavbar';
import GeneralAccountSettings from './GeneralProfileSettings/GeneralAccountSettings';
import SecuritySettings from './SecuritySettings/SecuritySettings';
import './AccountPage.css';

const AccountPage = () => {
  return (
    <div className='account-div'>
      <div className='account-div-container'>
        <div className='navbar'>
          <AccountNavbar />
        </div>
        <div className='active-component'>
          <Routes>
            <Route path="general" element={<GeneralAccountSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="/" element={<GeneralAccountSettings />} /> {/* Default route */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
