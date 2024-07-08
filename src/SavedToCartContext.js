import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './services/FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

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
