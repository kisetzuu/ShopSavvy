import React from 'react';
import styles from './ContactUs.css';

const contactDetails = [
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4d3bb71a8df3921212fcd02cd8ee6b278563c38d452ff60b4b65e2691c83c0b9?apiKey=fe9703e5149e411da79f9be12d689661&", text: "+63 2298 6986592" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f33a12af71453b99485ac9031fecc220eb9409e1999afd1ffbb8eef1e6b8f8f2?apiKey=fe9703e5149e411da79f9be12d689661&", text: "shopsavvy@gmail.com" },
  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a95236edbb272ad63891b22868a195f09637d663fca1420ca3cc4475295718e?apiKey=fe9703e5149e411da79f9be12d689661&", text: "Cebu City, Cebu" }
];

function ContactInfo() {
  return (
    <div className={styles.infoContainer}>
      <div className={styles.infoContent}>
        <h2 className={styles.infoTitle}>Contact Information</h2>
        <p className={styles.infoSubtitle}>Say something to start a live chat!</p>
        {contactDetails.map((detail, index) => (
          <div key={index} className={styles.contactDetail}>
            <img src={detail.icon} alt="" className={styles.contactIcon} />
            <span className={styles.contactText}>{detail.text}</span>
          </div>
        ))}
        <div className={styles.decorativeCircle}>
          <div className={styles.innerCircle} />
        </div>
      </div>
    </div>
  );
}

export default ContactInfo;