// src/components/UpdateStock.js
import React, { useEffect } from 'react';
import { db } from '../services/FirebaseConfig';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

const UpdateStock = () => {
  useEffect(() => {
    const updateStockQuantity = async () => {
      try {
        const batch = writeBatch(db);
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);

        querySnapshot.forEach((doc) => {
          const productRef = doc.ref;
          batch.update(productRef, { stock: 20 });
        });

        await batch.commit();
        console.log('Stock quantities updated successfully');
      } catch (error) {
        console.error('Error updating stock quantities:', error);
      }
    };

    updateStockQuantity();
  }, []);

  return (
    <div>
      <h1>Updating Stock Quantities...</h1>
    </div>
  );
};

export default UpdateStock;
