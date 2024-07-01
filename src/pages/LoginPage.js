import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/FirebaseConfig';
import './LoginPage.css';
//import authService from '../services/AuthService'; // Adjust the path as per your project structure

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user.getIdToken();
  })
  .then((token) => {
        // Signed in 
        setMessage(token);
        // ...
      })
    } catch (error) {
      setError('Login failed: ' + error.message);
      console.error('Error during login:', error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  /*const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };*/

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
