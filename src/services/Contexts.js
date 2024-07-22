// AuthContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { auth, db } from './FirebaseConfig';
import { checkEmailVerification } from './AuthServices';
import { checkProfileCompletion, fetchProfilePicture } from './UserServices';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchCartAndBalance, saveBalanceToDatabase, saveCartItemsToDatabase } from './CartServices';
import { getDoc, setDoc, doc, } from 'firebase/firestore';

// Auth Context 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Profile Verification

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

// Profile Picture 

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

// Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCartAndBalanceCallback = useCallback(async (currentUser) => {
    await fetchCartAndBalance(currentUser, setCartItems, setBalance);
    setLoading(false);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        await fetchCartAndBalanceCallback(currentUser);
      } else {
        setCartItems([]);
        setBalance(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchCartAndBalanceCallback]);

  useEffect(() => {
    if (user && !loading) {
      saveCartItemsToDatabase(user, cartItems);
    }
  }, [cartItems, user, loading]);

  useEffect(() => {
    if (user && !loading) {
      saveBalanceToDatabase(user, balance);
    }
  }, [balance, user, loading]);

  const addToCart = (items) => {
    setCartItems((prevItems) => [...prevItems, ...items]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart, setCartItems, balance, setBalance }}>
      {children}
    </CartContext.Provider>
  );
};


// SaveToCartContext

export const SavedToCartContext = createContext();

export const SavedToCartProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const savedDoc = await getDoc(doc(db, 'saved-to-cart', currentUser.uid));
          if (savedDoc.exists()) {
            setSavedItems(savedDoc.data().items || []);
          } else {
            setSavedItems([]);
          }
        } catch (error) {
          console.error("Error loading saved items from Firestore:", error);
        }
      } else {
        setSavedItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveItemsToFirestore = async (items) => {
    if (user) {
      try {
        await setDoc(doc(db, 'saved-to-cart', user.uid), { items });
      } catch (error) {
        console.error("Error saving items to Firestore:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      saveItemsToFirestore(savedItems);
    }
  }, [savedItems, user]);

  const saveToCart = (items) => {
    setSavedItems((prevItems) => [...prevItems, ...items]);
  };

  const removeFromSaved = (id) => {
    setSavedItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  return (
    <SavedToCartContext.Provider value={{ savedItems, saveToCart, removeFromSaved, setSavedItems }}>
      {children}
    </SavedToCartContext.Provider>
  );
};


