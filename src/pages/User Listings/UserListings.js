// src/pages/UserListings/UserListings.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../services/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './UserListings.css';

const UserListings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const q = query(collection(db, 'products'), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        const userProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(userProducts);
      } else {
        setUser(null);
        setProducts([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  if (!user) {
    return <div>Please log in to view your listings.</div>;
  }

  return (
    <div className="user-listings-container">
      <h2>Your Listings</h2>
      <div className="user-listings">
        {products.map(product => (
          <div key={product.id} className="user-listing-item">
            <img src={product.image} alt={product.name} className="user-listing-image" />
            <p>{product.name}</p>
            <p>${product.price}</p>
            <button onClick={() => handleViewProduct(product.id)}>View Product</button>
            <button onClick={() => handleEditProduct(product.id)}>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListings;
