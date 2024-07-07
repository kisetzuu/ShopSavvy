// src/CartContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { auth, database } from './services/FirebaseConfig';
import { ref, get, set, child } from 'firebase/database';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCartAndBalance = useCallback(async (currentUser) => {
    const dbRef = ref(database);

    try {
      // Fetch cart items
      const cartSnapshot = await get(child(dbRef, `carts/${currentUser.uid}`));
      if (cartSnapshot.exists()) {
        console.log("Cart items fetched:", cartSnapshot.val().items);
        setCartItems(cartSnapshot.val().items || []);
      } else {
        console.log("No cart items found.");
        setCartItems([]);
      }

      // Fetch balance
      const balanceSnapshot = await get(child(dbRef, `balances/${currentUser.uid}`));
      if (balanceSnapshot.exists()) {
        console.log("Balance fetched:", balanceSnapshot.val());
        setBalance(balanceSnapshot.val());
      } else {
        console.log("No balance found, initializing to 0.");
        setBalance(0); // Initialize with 0 if no balance found
      }

    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
    } finally {
      setLoading(false); // Data fetching is done
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setLoading(true);
        await fetchCartAndBalance(currentUser);
      } else {
        setCartItems([]);
        setBalance(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchCartAndBalance]);

  const saveCartItemsToDatabase = useCallback(async (items) => {
    if (user) {
      try {
        const cartRef = ref(database, `carts/${user.uid}`);
        await set(cartRef, { items });
        console.log("Cart items saved:", items);
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
        console.log("Balance saved:", newBalance);
      } catch (error) {
        console.error("Error saving balance to Realtime Database:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && !loading) {
      saveCartItemsToDatabase(cartItems);
    }
  }, [cartItems, user, loading, saveCartItemsToDatabase]);

  useEffect(() => {
    if (user && !loading) {
      saveBalanceToDatabase(balance);
    }
  }, [balance, user, loading, saveBalanceToDatabase]);

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
