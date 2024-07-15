// src/pages/Account/AccountPage.js
import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../../services/FirebaseConfig'; // Adjust the path
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import './AccountPage.css';
import { fetchProfileData, fetchProfilePicture, editProfilePicture } from '../../services/UserServices';
import { handleAuthStateChange } from '../../services/AuthServices';

const AccountPage = () => {

  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileData, setProfileData] = useState({
    username: '',
    fullName: '',
    address: '',
    phoneNumber: '',
    profilePicture: '',
  });
  // const [email, setEmail] = useState(null);
  //const [fullName, setFullName] = useState(null);

  const [editEmail, setEditEmail] = useState(false);
  const [editUsername, setEditUsername] = useState(false);
  const [editFullName, setEditFullName] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPicture, setEditPicture] = useState(false);
  

  const handleEdit = (field) => {
    switch (field) {
      case 'email':
        setEditEmail(true);
        break;
      case 'username':
        setEditUsername(true);
        break;
      case 'fullName':
        setEditFullName(true);
        break;
      case 'address':
        setEditAddress(true);
        break;
      default:
        break;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await editProfilePicture(user, file, setProfilePicture);
    }
  };


  useEffect(() => {
    const unsubscribe = handleAuthStateChange(setUser);

    return () => unsubscribe;
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfileData(user, setProfileData);
      fetchProfilePicture(user, setProfilePicture);
    }
  }, [user]);  

  /*const [user, setUser] = useState(null);
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
    return <div>Please log in to view your account daetails.</div>;
  }*/

  if(!user){
    return;
  }

  return (
    <div className="account-container">
      <div>
        <p>Main Information</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {profileData.username}</p>
        <p><strong>Full Name:</strong> {profileData.fullName}</p>
        <p><strong>Address:</strong> {profileData.address}</p>
        <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>dd
      </div>
      <div>
      {profilePicture && <img src={profilePicture} alt="Profile" className="profile-picture" />}
      <input type="file" onChange={handleFileChange} />
    </div>
    </div>
  );
};

export default AccountPage;
