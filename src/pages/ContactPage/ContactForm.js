import React from 'react';
import styles from './ContactUs.css';

function ContactForm() {
  return (
    <form className={styles.formContainer}>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.formLabel}>First Name</label>
          <input type="text" id="firstName" className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.formLabel}>Last Name</label>
          <input type="text" id="lastName" className={styles.formInput} placeholder="Doe" />
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Email</label>
          <input type="email" id="email" className={styles.formInput} placeholder="@gmail.com" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>Phone Number</label>
          <input type="tel" id="phone" className={styles.formInput} placeholder="+1 012 3456 789" />
        </div>
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="message" className={styles.formLabel}>Message</label>
        <textarea id="message" className={styles.formTextarea} placeholder="Write your message.."></textarea>
      </div>
      <button type="submit" className={styles.submitButton}>Send Message</button>
    </form>
  );
}

export default ContactForm;