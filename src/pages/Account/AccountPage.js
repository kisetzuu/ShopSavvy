// src/pages/Account/AccountPage.js
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../services/FirebaseConfig'; // Adjust the path
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import './AccountPage.css';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    profilePicture: '',
  });
  const [newProfileData, setNewProfileData] = useState({
    username: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    profilePicture: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(db, 'users', currentUser.uid);
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          setProfileData(userDocSnapshot.data());
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData({ ...newProfileData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfilePictureFile(e.target.files[0]);
  };

  const handleSaveProfile = async () => {
    if (user) {
      const userDoc = doc(db, 'users', user.uid);
      if (profilePictureFile) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        const uploadTask = uploadBytesResumable(storageRef, profilePictureFile);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Error uploading profile picture:", error);
            setUploadError("Error uploading profile picture. Please try again.");
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              console.log('File available at', downloadURL);
              await setDoc(userDoc, { ...newProfileData, profilePicture: downloadURL }, { merge: true });
              setProfileData({ ...newProfileData, profilePicture: downloadURL });
              setNewProfileData({
                username: '',
                fullName: '',
                address: '',
                phoneNumber: '',
                profilePicture: '',
              });
              setProfilePictureFile(null);
              setUploadError(null);
              alert("Profile updated successfully!");
            } catch (error) {
              console.error("Error saving profile data:", error);
              setUploadError("Error saving profile data. Please try again.");
            }
          }
        );
      } else {
        try {
          await setDoc(userDoc, newProfileData, { merge: true });
          setProfileData(newProfileData);
          setNewProfileData({
            username: '',
            fullName: '',
            address: '',
            phoneNumber: '',
            profilePicture: '',
          });
          setUploadError(null);
          alert("Profile updated successfully!");
        } catch (error) {
          console.error("Error saving profile data:", error);
          setUploadError("Error saving profile data. Please try again.");
        }
      }
    } else {
      alert("No user logged in.");
    }
  };

  if (!user) {
    return <div>Please log in to view your account details.</div>;
  }

  return (
    <div className="account-container">
      <h2>Account Details</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {profileData.username}</p>
      <p><strong>Full Name:</strong> {profileData.fullName}</p>
      <p><strong>Address:</strong> {profileData.address}</p>
      <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
      {profileData.profilePicture && <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />}
      <div className="profile-update">
        <input
          type="text"
          name="username"
          value={newProfileData.username}
          onChange={handleChange}
          placeholder="Enter new username"
        />
        <input
          type="text"
          name="fullName"
          value={newProfileData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
        />
        <input
          type="text"
          name="address"
          value={newProfileData.address}
          onChange={handleChange}
          placeholder="Enter address"
        />
        <input
          type="text"
          name="phoneNumber"
          value={newProfileData.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleSaveProfile}>Save Profile</button>
        {uploadError && <p className="error-message">{uploadError}</p>}
      </div>
    </div>
  );
};

export default AccountPage;
