// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './services/FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const cartDoc = await getDoc(doc(db, 'carts', currentUser.uid));
          if (cartDoc.exists()) {
            setCartItems(cartDoc.data().items || []);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error("Error loading cart items from Firestore:", error);
        }
      } else {
        setCartItems([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const saveCartItemsToFirestore = async (items) => {
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), { items });
      } catch (error) {
        console.error("Error saving cart items to Firestore:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      saveCartItemsToFirestore(cartItems);
    }
  }, [cartItems, user]);

  const addToCart = (items) => {
    setCartItems((prevItems) => [...prevItems, ...items]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
