import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'
import { auth } from '../../services/FirebaseConfig';
import { handleLogin, handleFBAuth} from '../../services/AuthHelpers';

const LoginPage = () => {
  const navigate = useNavigate();

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

  const handleFacebookAuth = async (e) => {
    await handleFBAuth(navigate, setError);
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
          <div className="form-group">
            <label htmlFor="email">Email/Username:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
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
            <button type="submit" className="login-button">Login</button>
          </div>
          <div>
            <button type="button" className="register-button" onClick={handleRegister}>Register</button>
          </div>
          <div>
            <label>Sign-up With</label>
          </div>
          <div>
            <button type="button" className="facebook-button" onClick={handleFacebookAuth}>Facebook</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
