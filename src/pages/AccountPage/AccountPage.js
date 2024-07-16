import React from 'react';
import GeneralAccountSettings from './GeneralProfileSettings/GeneralAccountSettings';
import SecuritySettings from './SecuritySettings/SecuritySettings';
const AccountPage = () => {
  return (
    <div>
      <GeneralAccountSettings />
      <SecuritySettings />
    </div>
  );
};

export default AccountPage;
