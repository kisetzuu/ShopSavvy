import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <div className="product-detail-image-container">
        <img src={product.image} alt={product.name} className="product-detail-image" />
      </div>
      <p className="price">Price: ${product.price}</p>
      <p className="description">{product.description}</p>
      <p className="stock">Stock: {product.stock}</p>
      <p className="user-email">Listed by: {product.userEmail || 'Admin'}</p>
      <button className="back-button" onClick={() => navigate(-1)}>Back to Shop</button>
    </div>
  );
};

export default ProductDetailPage;
