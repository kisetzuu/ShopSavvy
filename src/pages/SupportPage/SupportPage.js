import React, { useState } from 'react';
import './SupportPage.css';

const SupportPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How can I track my order?",
      answer: "You can track your order status through your account dashboard or by using the tracking link provided in your order confirmation email."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all items. Please visit our Returns page for more information."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can contact our customer support team via email at support@shopsavvy.com, by phone at 1-800-123-4567, or through our 24/7 live chat service."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping to many countries. Shipping fees and delivery times vary depending on the destination. Please visit our Shipping Information page for more details."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "If you need to change or cancel your order, please contact us as soon as possible. Once an order has been processed, it cannot be changed or canceled."
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Login' button at the top right corner of the page, then select 'Sign Up' and follow the instructions."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept a variety of payment methods, including credit/debit cards, PayPal, and ShopSavvy gift cards."
    },
    {
      question: "How do I apply a discount code?",
      answer: "During checkout, you can enter your discount code in the 'Promo Code' field and click 'Apply' to see the discount reflected in your order total."
    },
  ];

  return (
    <div className="support">
      <h1 className="support-title">Support</h1>
      <div className="support-details">
        <div className="contact-methods">
          <p>If you need assistance, please reach out to us through one of the following methods:</p>
          <p>Email: <a href="mailto:support@shopsavvy.com">support@shopsavvy.com</a></p>
          <p>Phone: 1-800-123-4567</p>
          <p>Live Chat: Available 24/7</p>
        </div>
      </div>

      <div className="faq-section">
        <h2 className='faq-title'>Frequently Asked Questions</h2>
        <br />
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
            </div>
            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportPage;
