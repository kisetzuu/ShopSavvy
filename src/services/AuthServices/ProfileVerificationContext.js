import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkEmailVerification } from './AuthServices';
import { checkProfileCompletion } from '../UserServices/UserServices';
import { AuthContext } from './AuthContext';

export const ProfileVerificationContext = createContext();

export const ProfileVerificationProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [isVerified, setIsVerified] = useState(false);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const verifyProfile = async () => {
      if (user) {
        const verified = await checkEmailVerification(user);
        const profileComplete = await checkProfileCompletion(user);
        setIsVerified(verified);
        setIsProfileComplete(profileComplete);
      } else {
        setIsVerified(false);
        setIsProfileComplete(false);
      }
    };

    verifyProfile();
  }, [user]);

  return (
    <ProfileVerificationContext.Provider value={{ isVerified, isProfileComplete }}>
      {children}
    </ProfileVerificationContext.Provider>
  );
};
