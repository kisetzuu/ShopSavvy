import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { auth } from '../../../services/FirebaseConfig';

const SecuritySettings = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      // Reauthenticate user with current password before changing it
      const credential = auth.EmailAuthProvider.credential(user.email, currentPassword);
      await auth.currentUser.reauthenticateWithCredential(credential);
      
      // Change password
      await auth.currentUser.updatePassword(newPassword);
      console.log('Password updated successfully!');
      
      // Clear form and errors
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SecuritySettings;
