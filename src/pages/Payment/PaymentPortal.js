// src/pages/Payment/PaymentPortal.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext'; // Adjusted path based on your structure
import './PaymentPortal.css';

const paymentMethods = [
  { name: 'GCash', image: '/gcash_logo.png' },
  { name: 'Visa', image: '/visa_logo.jpg' },
  { name: 'Mastercard', image: '/mastercard_logo.png' },
  { name: 'GrabPay', image: '/grab_logo.jpg' },
  // Add more payment methods as needed
];

const PaymentPortal = () => {
  const { balance, setBalance } = useContext(CartContext);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handleAddBalance = () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    if (!selectedPaymentMethod) {
      setError('Please select a payment method.');
      return;
    }
    setBalance(balance + parsedAmount);
    setError('');
    navigate('/');
  };

  return (
    <div className="payment-portal">
      <div className="payment-container">
        <h1 className="shop-savvy-header"></h1>
        <h2>Select Payment Option</h2>
        <div className="payment-method-list">
          {paymentMethods.map((method) => (
            <div
              key={method.name}
              className={`payment-method-item ${selectedPaymentMethod === method.name ? 'selected' : ''}`}
              onClick={() => setSelectedPaymentMethod(method.name)}
            >
              <img src={method.image} alt={method.name} />
              <p>{method.name}</p>
            </div>
          ))}
        </div>
        <div className="balance-form">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {error && <div className="error">{error}</div>}
          <button onClick={handleAddBalance}>Add Balance</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPortal;
