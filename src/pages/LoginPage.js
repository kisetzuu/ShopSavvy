import React, { useState } from 'react';
import './LoginPage.css';
import authService from '../services/AuthService'; // Adjust the path as per your project structure

const LoginPage = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!emailOrUsername || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const { success, error: errorMsg } = await authService.login(emailOrUsername, password);

      if (success) {
        setMessage('Login successful');
        console.log('Login successful');
        // Handle further logic here, like redirecting to another page
      } else {
        setError(errorMsg || 'Login failed');
        console.error('Login failed:', errorMsg);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during login:', error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage('Register button clicked');
    // Handle register logic here
    console.log('Register button clicked');
  };

  return (
    <div className='login-div'>
      <div className="login-container">
        <div className='logo-container'>
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className='logo'/>
        </div>
        <h2>Log-in to ShopSavvy</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form>
          <div className="form-group">
            <label htmlFor="emailOrUsername">Email/Username:</label>
            <input
              type="text"
              id="emailOrUsername"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
          </div>
          <div>
            <button type="submit" className="register-button" onClick={handleRegister}>Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
