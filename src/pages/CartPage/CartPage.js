import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext'; // Adjusted path based on your structure
import { auth, database } from '../../services/FirebaseConfig'; // Adjusted path based on your structure
import { ref, get, child, set } from 'firebase/database';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, setCartItems, removeFromCart, emptyCart, balance, setBalance } = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const dbRef = ref(database);
          const cartSnapshot = await get(child(dbRef, `carts/${user.uid}`));
          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.val().items || []);
          } else {
            setCartItems([]);
          }
        } catch (error) {
          console.error("Error fetching cart items from Realtime Database:", error);
        }
      }
    };

    fetchCartItems();
  }, [setCartItems]);

  useEffect(() => {
    const calculateTotalCost = () => {
      const cost = cartItems.reduce((total, item) => total + item.price, 0);
      setTotalCost(cost);
    };

    calculateTotalCost();
  }, [cartItems]);

  const handleCheckout = async () => {
    const user = auth.currentUser;
    if (user) {
      const newBalance = balance - totalCost;

      if (newBalance < 0) {
        alert('Insufficient balance for checkout.');
        return;
      }

      try {
        const balanceRef = ref(database, `balances/${user.uid}`);
        const cartRef = ref(database, `carts/${user.uid}`);

        // Check if the balance node exists
        const balanceSnapshot = await get(balanceRef);
        if (balanceSnapshot.exists()) {
          await set(balanceRef, newBalance);
        } else {
          // Create balance node if it doesn't exist
          await set(balanceRef, newBalance);
        }

        // Clear the cart
        await set(cartRef, { items: [] });

        setBalance(newBalance);
        setCartItems([]);
        navigate('/receipt', { state: { cartItems, totalCost, balance: newBalance } });
      } catch (error) {
        console.error("Error during checkout:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <p className="cart-item-name">{item.name}</p>
              <p className="cart-item-price">${item.price}</p>
              <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <>
          <div className="cart-total">
            <p>Total Cost: ${totalCost}</p>
            <p>Balance: ${balance}</p>
          </div>
          <div className="cart-actions">
            <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
            <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
        </>
      )}
      {cartItems.length === 0 && (
        <div className="empty-cart-message">
          <p>Your cart is currently empty.</p>
          <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
