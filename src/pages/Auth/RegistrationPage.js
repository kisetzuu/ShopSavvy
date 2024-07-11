import React, { useState } from 'react';
import { auth, db, fbAuth, googleAuth } from '../../services/FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleRegister, handleOtherAuth } from '../../services/AuthHelpers';
import './AuthPage.css'

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    handleRegister(e, auth, db, email, password, confirmPassword, name, setError, setMessage, navigate);
  };
  
  const handleFacebookAuth = async () => {
    await handleOtherAuth(navigate, setError, location.pathname, fbAuth);
  }

  const handleGoogleAuth = async () => {
    await handleOtherAuth(navigate, setError, location.pathname, googleAuth);
  }
  

  
  return (
    <div className='login-div'>
      <div className="login-container">
        <div className='logo-container'>
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className='logo' />
        </div>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="register-button">Register</button>
          </div>
          <div>
            <label>Sign-up With</label>
          </div>
          <div>
            <button type="button" className="facebook-button" onClick={handleFacebookAuth}>Facebook</button>
          </div>
          <div>
            <button type="button" className="google-button" onClick={handleGoogleAuth}>Google</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
