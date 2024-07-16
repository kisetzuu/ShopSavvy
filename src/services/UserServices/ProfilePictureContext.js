import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchProfilePicture } from './UserServices';
import { AuthContext } from '../AuthServices/AuthContext';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const getProfilePicture = async () => {
      if (user) {
        fetchProfilePicture(user, setProfilePicture);
      }
    };
    getProfilePicture();
  }, [user]);

  const updateProfilePicture = (newPicture) => {
    setProfilePicture(newPicture);
  };

  return (
    <ProfileContext.Provider value={{ profilePicture, updateProfilePicture }}>
      {children}
    </ProfileContext.Provider>
  );
};
