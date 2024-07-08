import React from 'react';
import './SupportPage.css';

const SupportPage = () => {
  return (
    <div className="support-container">
      <h1>Support</h1>
      <p>If you need assistance, please reach out to us through one of the following methods:</p>
      <ul>
        <li>Email: support@shopsavvy.com</li>
        <li>Phone: 1-800-123-4567</li>
        <li>Live Chat: Available 24/7</li>
      </ul>
      <h2>Frequently Asked Questions</h2>
      <div className="faq-section">
        <h3>How can I track my order?</h3>
        <p>You can track your order status through your account dashboard or by using the tracking link provided in your order confirmation email.</p>

        <h3>What is your return policy?</h3>
        <p>We offer a 30-day return policy for all items. Please visit our Returns page for more information.</p>

        <h3>How do I contact customer support?</h3>
        <p>You can contact our customer support team via email at support@shopsavvy.com, by phone at 1-800-123-4567, or through our 24/7 live chat service.</p>

        <h3>Do you offer international shipping?</h3>
        <p>Yes, we offer international shipping to many countries. Shipping fees and delivery times vary depending on the destination. Please visit our Shipping Information page for more details.</p>

        <h3>Can I change or cancel my order?</h3>
        <p>If you need to change or cancel your order, please contact us as soon as possible. Once an order has been processed, it cannot be changed or canceled.</p>

        <h3>How do I create an account?</h3>
        <p>To create an account, click on the "Login" button at the top right corner of the page, then select "Sign Up" and follow the instructions.</p>

        <h3>What payment methods do you accept?</h3>
        <p>We accept a variety of payment methods, including credit/debit cards, PayPal, and ShopSavvy gift cards.</p>

        <h3>How do I apply a discount code?</h3>
        <p>During checkout, you can enter your discount code in the "Promo Code" field and click "Apply" to see the discount reflected in your order total.</p>
      </div>
    </div>
  );
};

export default SupportPage;
