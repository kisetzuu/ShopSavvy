// src/CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { auth, database } from './services/FirebaseConfig';
import { ref, set, get, child } from 'firebase/database';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [balance, setBalance] = useState(null); // Initialize balance as null
  const [user, setUser] = useState(null);

  const saveCartItemsToDatabase = useCallback(async (items) => {
    if (user) {
      try {
        const cartRef = ref(database, `carts/${user.uid}`);
        await set(cartRef, { items });
      } catch (error) {
        console.error("Error saving cart items to Realtime Database:", error);
      }
    }
  }, [user]);

  const saveBalanceToDatabase = useCallback(async (newBalance) => {
    if (user) {
      try {
        const balanceRef = ref(database, `balances/${user.uid}`);
        await set(balanceRef, newBalance);
      } catch (error) {
        console.error("Error saving balance to Realtime Database:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const dbRef = ref(database);
          const cartSnapshot = await get(child(dbRef, `carts/${currentUser.uid}`));
          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.val().items || []);
          } else {
            setCartItems([]);
          }

          const balanceSnapshot = await get(child(dbRef, `balances/${currentUser.uid}`));
          if (balanceSnapshot.exists()) {
            setBalance(balanceSnapshot.val());
          } else {
            setBalance(0); // Set to 0 if no balance found in database
          }
        } catch (error) {
          console.error("Error loading cart items and balance from Realtime Database:", error);
        }
      } else {
        setCartItems([]);
        setBalance(null); // Set to null when no user is authenticated
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user !== null && balance !== null) {
      saveBalanceToDatabase(balance);
    }
  }, [balance, user, saveBalanceToDatabase]);

  useEffect(() => {
    if (user !== null) {
      saveCartItemsToDatabase(cartItems);
    }
  }, [cartItems, user, saveCartItemsToDatabase]);

  const addToCart = (items) => {
    setCartItems((prevItems) => [...prevItems, ...items]);
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  const updateBalance = (amount) => {
    setBalance((prevBalance) => (prevBalance !== null ? prevBalance + amount : amount));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart, setCartItems, balance, setBalance, updateBalance }}>
      {children}
    </CartContext.Provider>
  );
};
