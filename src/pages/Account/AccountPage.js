// src/pages/Account/AccountPage.js
import React, { useState, useEffect } from 'react';
import './AccountPage.css';
import { fetchProfileData, fetchProfilePicture, editProfilePicture, editProfileDetails } from '../../services/UserServices';
import { handleAuthStateChange, isVerified } from '../../services/AuthServices';
import { isEmptyOrWhitespace } from '../../services/GeneralHelpers';
const AccountPage = () => {

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isUserVerified, setIsUserVerified] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    phoneNumber: '',
    profilePicture: '',
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await editProfilePicture(user, file, setProfilePicture);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
  
      const fieldsToUpdate = {
        username,
        firstName,
        lastName,
        phoneNumber,
      };
  
      await editProfileDetails(user.uid, fieldsToUpdate);
  
      console.log('Profile details updated successfully!');
    } catch (error) {
      console.error('Failed to update profile details:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = handleAuthStateChange(setUser);
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    const fetchDataAndCheckVerification = async () => {
      if (user) {
        fetchProfileData(user, setProfileData);
        fetchProfilePicture(user, setProfilePicture);
        
        // Check verification
        const verified = await isVerified(user);
        setIsUserVerified(verified);
      }
    };

    fetchDataAndCheckVerification();
  }, [user]);

  if(!user){
    return;
  }

  return (
    <div className="account-container">
      <div>
        {!isUserVerified && (
          <div style={{ color: 'red', marginBottom: '10px' }}>
            Warning: Your email is not verified. Please verify your email to access all features.
          </div>
        )}

        <p>Main Information</p>

        <p><strong>Email:</strong> {user.email}</p>
        <form onSubmit={handleSubmit}>
          <p><strong>Username:</strong> {profileData.username}</p>
          {isEmptyOrWhitespace(profileData.username) && (
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          )}

          <p><strong>Full Name:</strong> {profileData.fullName}</p>
          {isEmptyOrWhitespace(profileData.fullName) && (
            <div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
          )}

          <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
          {isEmptyOrWhitespace(profileData.phoneNumber) && (
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          )}

          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
      {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />}
      <input type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default AccountPage;
