import { database } from './FirebaseConfig';
import { ref, get, set, child } from 'firebase/database';

export const fetchCartAndBalance = async (currentUser, setCartItems, setBalance) => {
    const dbRef = ref(database);
  
    try {
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
    }
  };
  
  // Save cart items to database
export const saveCartItemsToDatabase = async (user, items) => {
    if (user) {
      try {
        const cartRef = ref(database, `carts/${user.uid}`);
        await set(cartRef, { items });
        console.log("Cart items saved:", items);
      } catch (error) {
        console.error("Error saving cart items to Realtime Database:", error);
      }
    }
  };
  
  // Save balance to database
export const saveBalanceToDatabase = async (user, newBalance) => {
    if (user) {
      try {
        const balanceRef = ref(database, `balances/${user.uid}`);
        await set(balanceRef, newBalance);
        console.log("Balance saved:", newBalance);
      } catch (error) {
        console.error("Error saving balance to Realtime Database:", error);
      }
    }
  };