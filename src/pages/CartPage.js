import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, emptyCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={`${process.env.PUBLIC_URL}${item.image}`} alt={item.name} className="cart-item-image" />
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
