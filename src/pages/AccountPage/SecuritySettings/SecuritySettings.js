import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { isThirdPartyProvider } from '../../../services/AuthServices/AuthServices';
import { ProfileVerificationContext } from '../../../services/AuthServices/ProfileVerificationContext';
import { sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
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

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setError(null);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message);
    }
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

        {isThirdPartyAuth ? (
          <p>Third-party authentication is enabled</p>
        ) : (
          <form onSubmit={handleChangePassword}>
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
        {error && <p className="error-message">{error + user.email}</p>}
      </div>
    </div>
  );
};

export default SecuritySettings;
