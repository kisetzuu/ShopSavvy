import React from 'react';
import styles from './ContactUs.css';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';

function ContactUs() {
  return (
    <main className={styles.contactContainer}>
      <header className={styles.contactHeader}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Any question or remarks? Just write us a message!
        </p>
      </header>
      <section className={styles.contactContent}>
        <ContactInfo />
        <ContactForm />
      </section>
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/14963d079c15eb42acdaaa9a7e1f3151b3944cf43076367f4701f78e5a669802?apiKey=fe9703e5149e411da79f9be12d689661&" alt="" className={styles.decorativeImage} />
    </main>
  );
}

export default ContactUs;