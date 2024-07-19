import React, { useState } from 'react';
import { auth, db, fbAuth, googleAuth } from '../../services/FirebaseConfig';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleRegister, handleOtherAuth } from '../../services/AuthServices/AuthServices';
import './AuthPage.css'

const RegistrationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    await handleRegister(e, auth, email, password, confirmPassword, setError, setMessage, navigate);
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
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className='auth-logo' />
        </div>
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="auth-input-group">
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
          <div className='button-group'>
            <label>Sign-up With</label>
          <div>
            <button type="button" class="facebook-button" onClick={handleFacebookAuth}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook Logo" class="button-icon" />
              Facebook
            </button>
          </div>

          <div>
            <button type="button" class="google-button" onClick={handleGoogleAuth}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google Logo" class="button-icon" />
              Google
            </button>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
