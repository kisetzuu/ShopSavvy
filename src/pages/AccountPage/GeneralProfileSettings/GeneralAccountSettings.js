// src/pages/Account/AccountPage.js
import React, { useState, useEffect, useContext } from 'react';
import './GeneralAccountSettings.css'
import { fetchProfileData, fetchProfilePicture, editProfilePicture, editProfileDetails } from '../../../services/UserServices/UserServices';
import { isVerified } from '../../../services/AuthServices/AuthServices';
import { isEmptyOrWhitespace } from '../../../services/GeneralHelpers';
import { AuthContext } from '../../../services/AuthServices/AuthContext';
import { ProfileContext } from '../../../services/UserServices/ProfilePictureContext';

const GeneralAccountSettings = () => {

  const { user } = useContext(AuthContext);
  const { profilePicture, updateProfilePicture } = useContext(ProfileContext);
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
      await editProfilePicture(user, file, updateProfilePicture);
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
    const fetchDataAndCheckVerification = async () => {
      if (user) {
        fetchProfileData(user, setProfileData);
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

export default GeneralAccountSettings;
