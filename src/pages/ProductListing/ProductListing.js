import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../../services/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './ProductListing.css';

const ProductListing = () => {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',  // Add stock field
    imageFile: null,
  });

  const categories = [
    { name: 'Razer', value: 'razer' },
    { name: 'ROG', value: 'rog' },
    { name: 'SteelSeries', value: 'steelseries' },
    { name: 'Logitech', value: 'logitech' },
    { name: 'Predator', value: 'predator' },
  ];

  const handleNewProductChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setNewProduct({ ...newProduct, [name]: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleAddProduct = async () => {
    console.log('Add Product button clicked');
    
    if (!auth.currentUser) {
      alert('You must be logged in to add a product.');
      navigate('/login');
      return;
    }

    const { name, description, price, category, stock, imageFile } = newProduct;
    const userId = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;

    console.log('Product Details:', { name, description, price, category, stock, imageFile, userId, userEmail });

    if (!name || !description || !price || !category || !stock || !imageFile) {
      alert('Please fill out all fields and select an image.');
      return;
    }

    try {
      console.log('Uploading image to storage...');
      const storageRef = ref(storage, `productImages/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.error('Error uploading image:', error);
        },
        async () => {
          console.log('Image uploaded successfully, getting download URL...');
          const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Image URL:', imageURL);

          console.log('Adding product to Firestore...');
          await addDoc(collection(db, 'products'), {
            name,
            description,
            price: parseFloat(price),
            category,
            stock: parseInt(stock, 10),  // Save stock as integer
            image: imageURL,
            userId,
            userEmail,
          });

          console.log('Product added successfully!');
          alert('Product added successfully!');
          setNewProduct({ name: '', description: '', price: '', category: '', stock: '', imageFile: null });
          navigate('/shop');
        }
      );
    } catch (error) {
      console.error('Error adding product:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="product-listing-container">
      <h2>List a New Product</h2>
      <div className="listing-form">
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleNewProductChange}
          placeholder="Product Name"
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleNewProductChange}
          placeholder="Product Description"
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleNewProductChange}
          placeholder="Product Price"
        />
        <input
          type="number"
          name="stock"  // Add stock input
          value={newProduct.stock}
          onChange={handleNewProductChange}
          placeholder="Stock Quantity"
        />
        <select
          name="category"
          value={newProduct.category}
          onChange={handleNewProductChange}
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.value} value={category.value}>{category.name}</option>
          ))}
        </select>
        <input
          type="file"
          name="imageFile"
          onChange={handleNewProductChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default ProductListing;
