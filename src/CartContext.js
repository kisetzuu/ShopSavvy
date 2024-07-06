// src/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from './services/FirebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0); // Balance state

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchCartData(currentUser.uid);
      } else {
        setCartItems([]);
        setBalance(0); // Reset balance
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchCartData = async (userId) => {
    try {
      const cartDoc = await getDoc(doc(db, 'carts', userId));
      if (cartDoc.exists()) {
        const data = cartDoc.data();
        setCartItems(data.items || []);
        setBalance(data.balance || 1000); // Set balance with a default value if not present
      } else {
        setCartItems([]);
        setBalance(1000); // Default balance for new users
      }
    } catch (error) {
      console.error("Error loading cart data from Firestore:", error);
    }
  };

  const saveCartDataToFirestore = async (items, balance) => {
    if (user) {
      try {
        await setDoc(doc(db, 'carts', user.uid), { items, balance }, { merge: true });
      } catch (error) {
        console.error("Error saving cart data to Firestore:", error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      saveCartDataToFirestore(cartItems, balance);
    }
  }, [cartItems, balance, user]);

  const addToCart = (items, cost) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems, ...items];
      saveCartDataToFirestore(newItems, balance - cost);
      return newItems;
    });
    setBalance((prevBalance) => prevBalance - cost);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter(item => item.id !== id);
      saveCartDataToFirestore(newItems, balance);
      return newItems;
    });
  };

  const emptyCart = () => {
    setCartItems([]);
    if (user) {
      saveCartDataToFirestore([], balance);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, balance, addToCart, removeFromCart, emptyCart, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};
