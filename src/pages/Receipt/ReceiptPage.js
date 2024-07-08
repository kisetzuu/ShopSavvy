// src/pages/ReceiptPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReceiptPage.css';

const ReceiptPage = () => {
  const { state } = useLocation();
  const { cartItems, totalCost, balance } = state || {};
  const navigate = useNavigate();

  if (!cartItems || !totalCost || balance === undefined) {
    return <div>No receipt data available.</div>;
  }

  const handleBackToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="receipt-container">
      <h2>Receipt</h2>
      <div className="receipt-items">
        {cartItems.map(item => (
          <div key={item.id} className="receipt-item">
            <img src={item.image} alt={item.name} className="receipt-item-image" />
            <div className="receipt-item-details">
              <p className="receipt-item-name">{item.name}</p>
              <p className="receipt-item-price">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="receipt-total">
        <p>Total Cost: ${totalCost}</p>
        <p>Remaining Balance: ${balance}</p>
      </div>
      <button className="back-to-shop-button" onClick={handleBackToShop}>Back to Shop</button>
    </div>
  );
};

export default ReceiptPage;
