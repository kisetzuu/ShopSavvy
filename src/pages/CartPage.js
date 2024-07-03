import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, removeFromCart, emptyCart } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            {item.name}
            <button className="remove-item-button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <button className="empty-cart-button" onClick={emptyCart}>Empty Cart</button>
      )}
    </div>
  );
};

export default CartPage;
