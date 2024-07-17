import React, { useState } from 'react';
import AccountNavbar from './AccountNavbar/AccountNavbar';
import GeneralAccountSettings from './GeneralProfileSettings/GeneralAccountSettings';
import SecuritySettings from './SecuritySettings/SecuritySettings';
import './AccountPage.css';

const AccountPage = () => {
  const [activeComponent, setActiveComponent] = useState('general');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'general':
        return <GeneralAccountSettings />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <GeneralAccountSettings />;
    }
  };

  return (
    <div className='account-div'>
      <div className='account-div-container'>
        <div className='navbar'>
          <AccountNavbar setActiveComponent={setActiveComponent} />
        </div>
        <div className='active-component'>
          {renderComponent()}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
