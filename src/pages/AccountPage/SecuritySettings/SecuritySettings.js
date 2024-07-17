import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { auth } from '../../../services/FirebaseConfig';
import { isThirdPartyProvider, checkEmailVerification } from '../../../services/AuthServices/AuthServices';
import { ProfileVerificationContext } from '../../../services/AuthServices/ProfileVerificationContext';

const SecuritySettings = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [isThirdPartyAuth, setIsThirdPartyAuth] = useState(false);
  const [isVerified, setIsVerified] = useState(ProfileVerificationContext);

  useEffect(() => {
    setIsThirdPartyAuth(isThirdPartyProvider(user));
  }, [user]);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await auth.currentUser.reauthenticateWithCredential(credential);
      await auth.currentUser.updatePassword(newPassword);
      console.log('Password updated successfully!');

      // Send confirmation email
      await auth.currentUser.sendEmailVerification();
      console.log('Confirmation email sent!');

      setCurrentPassword('');
      setNewPassword('');
      setError(null);
    } catch (error) {
      console.error('Error changing password:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Security Settings</h2>
      
      {isThirdPartyAuth ? (
        <p></p>
      ) : (
        <form onSubmit={handleChangePassword}>
          <label>
            Current Password:
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </label>
          <label>
            New Password:
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SecuritySettings;
