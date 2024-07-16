import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthPage.css'
import { auth } from '../../services/FirebaseConfig';
import { handleLogin, handleOtherAuth } from '../../services/AuthServices/AuthServices';
import { fbAuth, googleAuth } from '../../services/FirebaseConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleSubmit = (e) => {
    handleLogin(e, auth, email, password, setError, setMessage, navigate);
  };

  const handleFBAuth = async (e) => {
    await handleOtherAuth(navigate, setError, location.pathname, fbAuth);
  }

  const handleGoogleAuth = async (e) => {
    await handleOtherAuth(navigate, setError, location.pathname, googleAuth);
  }

  return (
    <div className='login-div'>
      <div className="login-container">
        <div className='logo-container'>
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className='logo'/>
        </div>
        <h2>Log-in to ShopSavvy</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className='input-group'>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" className="login-button">Login</button>
          </div>
          <div>
            <button type="button" className="register-button" onClick={handleRegister}>Register</button>
          </div>
          <div className='button-group'>
            <label>Sign-up With</label>
          <div>
            <button type="button" class="facebook-button" onClick={handleFBAuth}>
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

export default LoginPage;
