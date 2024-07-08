// src/services/SeedFirestore.js
import { db } from './FirebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';

const products = [
  { id: 1, category: 'razer', name: 'Razer Basilisk V3', image: '/product1.jpg', price: 50, description: 'A high-quality gaming mouse from Razer.' },
  { id: 2, category: 'rog', name: 'ROG Pugio', image: '/product2.jpg', price: 70, description: 'A premium gaming mouse from ROG.' },
  { id: 3, category: 'steelseries', name: 'SteelSeries Apex Pro', image: '/product3.jpg', price: 100, description: 'A top-notch mechanical keyboard from SteelSeries.' },
  { id: 4, category: 'logitech', name: 'Logitech G Pro X', image: '/product4.jpg', price: 120, description: 'A professional-grade gaming headset from Logitech.' },
  { id: 5, category: 'predator', name: 'Acer Predator Helios', image: '/product5.jpg', price: 150, description: 'A powerful gaming laptop from Acer.' },
  { id: 6, category: 'razer', name: 'Razer BlackWidow V3', image: '/razer_black_widow_v3.jpg', price: 130, description: 'A high-quality mechanical keyboard from Razer.' },
  { id: 7, category: 'rog', name: 'ROG Delta', image: '/rog_delta.jpg', price: 80, description: 'A premium gaming headset from ROG.' },
  { id: 8, category: 'steelseries', name: 'Steelseries Aerox', image: '/steelseries_aerox.jpg', price: 60, description: 'A lightweight gaming mouse from SteelSeries.' },
  { id: 9, category: 'logitech', name: 'Logitech G29', image: '/logitech_g29.jpg', price: 90, description: 'A high-quality racing wheel from Logitech.' },
  { id: 10, category: 'predator', name: 'Acer Predator X45', image: '/acer_predator_x45.jpg', price: 200, description: 'A powerful gaming monitor from Acer.' },
  { id: 11, category: 'razer', name: 'Razer Tartarus V2', image: '/razer_tartarus.jpg', price: 50, description: 'A high-quality gaming keypad from Razer.' },
  { id: 12, category: 'rog', name: 'ASUS ROG Strix XG27ACS', image: '/rog_asus_strix_xg.jpg', price: 110, description: 'A premium gaming monitor from ASUS ROG.' },
  { id: 13, category: 'steelseries', name: 'Steelseries Arctis 7P', image: '/steelseries_arctis7.jpg', price: 80, description: 'A premium gaming headset from SteelSeries.' },
  { id: 14, category: 'logitech', name: 'Logitech G502 Light', image: '/logitech_g502.jpg', price: 70, description: 'A high-quality gaming mouse from Logitech.' },
  { id: 15, category: 'predator', name: 'Predator Helios Neo 16', image: '/acer_predator_helios16.jpg', price: 220, description: 'A powerful gaming laptop from Acer.' },
];

export const seedFirestore = async () => {
  try {
    const productsCollection = collection(db, 'products');
    for (const product of products) {
      const productRef = doc(productsCollection, String(product.id));
      await setDoc(productRef, product);
      console.log(`Seeded product: ${product.name}`);
    }
    console.log('Firestore has been seeded');
  } catch (error) {
    console.error('Error seeding Firestore:', error.message);
    throw error; // Rethrow the error to be caught in SeedButton
  }
};
