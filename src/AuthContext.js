// src/AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import { auth } from './services/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || currentUser.email.split('@')[0], // Fallback to email if displayName is not set
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};
