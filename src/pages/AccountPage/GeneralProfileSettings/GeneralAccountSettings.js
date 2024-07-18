// src/pages/Account/AccountPage.js

import React, { useState, useEffect, useContext } from 'react';
import './GeneralAccountSettings.css'
import { fetchProfileData, fetchProfilePicture, editProfilePicture, editProfileDetails } from '../../../services/UserServices/UserServices';
import { checkEmailVerification } from '../../../services/AuthServices/AuthServices';
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

  const handleFileButtonClick = () => {
    document.getElementById('file-input').click();
  };

  useEffect(() => {
    const fetchDataAndCheckVerification = async () => {
      if (user) {
        fetchProfileData(user, setProfileData);
        const verified = await checkEmailVerification(user);
        setIsUserVerified(verified);
      }
    };
    fetchDataAndCheckVerification();
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div className="account-container">
      <h2>General Information Settings</h2>
      <div className='account-container-info'>
        <form onSubmit={handleSubmit}>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong></p>
          {isEmptyOrWhitespace(profileData.username) ? (
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' />
          ) : (
            <p>{profileData.username}</p>
          )}

          <p><strong>Full Name:</strong></p>
          {isEmptyOrWhitespace(profileData.fullName) ? (
            <div>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            </div>
          ) : (
            <p>{profileData.fullName}</p>
          )}

          <p><strong>Phone Number:</strong></p>
          {isEmptyOrWhitespace(profileData.phoneNumber) ? (
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
          ) : (
            <p>{profileData.phoneNumber}</p>
          )}
          <button className='profile-update-button' type="submit">Submit</button>
        </form>
      </div>
      <div className='profile-picture-container'>
        <p><strong>Profile Picture</strong></p>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}/account.png`} alt="Profile" className="profile-picture" />
        )}
        <label className="file-input-label">
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button type="button" className="file-input-button" onClick={handleFileButtonClick}>
            Upload File
          </button>
        </label>
      </div>
    </div>
  );
};

export default GeneralAccountSettings;
