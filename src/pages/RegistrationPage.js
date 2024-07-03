import React, { useState } from 'react';
import { auth } from '../services/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

//import authService from '../services/AuthService';

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
  
    const handleRegister = async (e) => {
      e.preventDefault(); 
      if (!email || !password || !confirmPassword) {
        setError('Please fill in both fields.');
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Registration successful');
        console.log('Registration successful', userCredential);
        // Handle further logic here, like redirecting to another page or updating user profile
        navigate('/shop');
      } catch (error) {
        setError('Registration failed: ' + error.message);
        console.error('Error during registration:', error);
      }
    };
    
    return (
        <div className='login-div'>
          <div className="login-container">
            <div className='logo-container'>
              <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className='logo'/>
            </div>
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
            <form>
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
                <button type="submit" className="register-button" onClick={handleRegister}>Register</button>
              </div>
            </form>
          </div>
        </div>
      );
};

export default RegistrationPage;
