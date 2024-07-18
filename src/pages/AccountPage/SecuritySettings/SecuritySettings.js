import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { isThirdPartyProvider, handleChangePassword } from '../../../services/AuthServices/AuthServices';
import { ProfileVerificationContext } from '../../../services/AuthServices/ProfileVerificationContext';
import { sendEmailVerification } from 'firebase/auth';
import './SecuritySettings.css';

const SecuritySettings = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [isThirdPartyAuth, setIsThirdPartyAuth] = useState(false);
  const { isVerified } = useContext(ProfileVerificationContext);

  useEffect(() => {
    setIsThirdPartyAuth(isThirdPartyProvider(user));
  }, [user]);

  const onChangePassword = (e) => {
    e.preventDefault();
    handleChangePassword(user, currentPassword, newPassword, setError, setCurrentPassword, setNewPassword);
  };

  const handleSendEmailVerification = async () => {
    try {
      await sendEmailVerification(user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="security-container">
      <h2>Security Settings</h2>

      <div className="security-container-info">
        <p><strong>Email Verification State:</strong></p>
        {isVerified ? (
          <p>Email is verified</p>
        ) : (
          <div>
            <p>Email is not verified</p>
            <button onClick={handleSendEmailVerification}>Send Verification Email</button>
          </div>
        )}

        {!isThirdPartyAuth && (
          <form onSubmit={onChangePassword}>
            <p><strong>Change Password:</strong></p>
            <label>
              <p><strong>Current Password:</strong></p>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </label>
            <label>
              <p><strong>New Password:</strong></p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Change Password</button>
          </form>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default SecuritySettings;
