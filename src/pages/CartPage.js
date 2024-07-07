// src/pages/CartPage.js
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { auth, database } from '../services/FirebaseConfig';
import { ref, get, child } from 'firebase/database';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, setCartItems, removeFromCart, emptyCart } = useContext(CartContext);
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
          }
        } catch (error) {
          console.error("Error fetching cart items from Realtime Database:", error);
        }
      }
    };

    fetchCartItems();
  }, [setCartItems]);

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
              <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className="cart-actions">
          <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
          <button className="continue-shopping-button" onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
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
