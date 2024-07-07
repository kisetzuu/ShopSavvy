// src/pages/ShopPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { auth, db, database } from '../services/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { ref, set, get, child } from 'firebase/database';
import './ShopPage.css';

const ProductItem = ({ product, onClick, onView }) => (
  <div className="shop-product-item" onClick={() => onClick(product.id)}>
    <img src={product.image} alt={product.name} className="shop-product-image" />
    <p>{product.name}</p>
    <p>${product.price}</p>
    <button onClick={(e) => {
      e.stopPropagation(); // Prevents the parent onClick from firing
      onView(product.id);
    }}>View Product</button>
  </div>
);

const CategoryItem = ({ category, onClick }) => (
  <div className="category-item" onClick={() => onClick(category.value)}>
    <img src={category.image} alt={category.name} className="category-image" />
    <p>{category.name}</p>
  </div>
);

const ProductList = ({ products, onProductClick, onViewProduct }) => (
  <div className="shop-product-list-inline">
    {products.map(product => (
      <ProductItem
        key={product.id}
        product={product}
        onClick={onProductClick}
        onView={onViewProduct}
      />
    ))}
  </div>
);

const Modal = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Items Added to Cart</h2>
        <p>Items have been added to the cart. Click 'View Cart' to view items.</p>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const navigate = useNavigate();
  const { setCartItems, balance, setBalance } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [balanceToAdd, setBalanceToAdd] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const dbRef = ref(database);
          const cartSnapshot = await get(child(dbRef, `carts/${currentUser.uid}`));
          if (cartSnapshot.exists()) {
            setCartItems(cartSnapshot.val().items || []);
          } else {
            setCartItems([]);
          }

          const balanceSnapshot = await get(child(dbRef, `balances/${currentUser.uid}`));
          if (balanceSnapshot.exists()) {
            setBalance(balanceSnapshot.val());
          } else {
            setBalance(0);
          }
        } catch (error) {
          console.error("Error loading cart items and balance from Realtime Database:", error);
        }
      } else {
        setCartItems([]);
        setBalance(0);
      }
    });

    return () => unsubscribe();
  }, [setCartItems, setBalance]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const bannerImage = `${process.env.PUBLIC_URL}/Geforce2.jpg`;

  const categories = [
    { name: 'Razer', image: '/razer.jpg', value: 'razer' },
    { name: 'ROG', image: '/rog.jpg', value: 'rog' },
    { name: 'SteelSeries', image: '/steelseries.jpg', value: 'steelseries' },
    { name: 'Logitech', image: '/logitech.jpg', value: 'logitech' },
    { name: 'Predator', image: '/predator.jpg', value: 'predator' },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleResetClick = () => {
    setSelectedCategory('');
    setSearchTerm('');
  };

  const handleProductClick = (productId) => {
    setSelectedProducts(prevSelected =>
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddBalance = async () => {
    if (!user) {
      alert('You must be logged in to add balance.');
      navigate('/login');
      return;
    }

    const newBalance = balance + parseFloat(balanceToAdd);

    if (isNaN(newBalance) || newBalance < 0) {
      alert('Invalid balance.');
      return;
    }

    try {
      const balanceRef = ref(database, `balances/${user.uid}`);
      await set(balanceRef, newBalance);
      setBalance(newBalance);
      setBalanceToAdd('');
    } catch (error) {
      console.error("Error adding balance to Realtime Database:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddToCart = async () => {
    console.log("Add to Cart button clicked");

    if (!user) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }

    const selectedItems = products.filter(product => selectedProducts.includes(product.id));
    const totalCost = selectedItems.reduce((total, product) => total + product.price, 0);

    console.log("Balance:", balance);
    console.log("Total Cost:", totalCost);
    console.log("New Balance:", balance - totalCost);

    if (isNaN(balance) || isNaN(totalCost) || balance - totalCost < 0) {
      alert('Invalid balance or cost.');
      return;
    }

    try {
      const cartRef = ref(database, `carts/${user.uid}`);
      const cartSnapshot = await get(cartRef);

      let currentItems = [];
      if (cartSnapshot.exists()) {
        currentItems = cartSnapshot.val().items || [];
      }

      const newItems = [...currentItems, ...selectedItems];

      console.log("Current Items: ", currentItems);
      console.log("Selected Items: ", selectedItems);
      console.log("New Items: ", newItems);

      await set(cartRef, { items: newItems });

      const newBalance = balance - totalCost;
      const balanceRef = ref(database, `balances/${user.uid}`);
      await set(balanceRef, newBalance);

      setCartItems(newItems);
      setBalance(newBalance);
      setShowModal(true);
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error saving cart items to Realtime Database:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div className="shop-container">
      <header className="shop-header">
        {/* Navigation bar removed */}
      </header>
      <section className="shop-hero" style={{ backgroundImage: `url(${bannerImage})` }}>
        <div className="shop-hero-content">
          {/* Hero Content */}
        </div>
      </section>

      <section className="balance-section">
        <h2>Your Balance: ${balance}</h2>
        <div className="add-balance">
          <input
            type="number"
            value={balanceToAdd}
            onChange={(e) => setBalanceToAdd(e.target.value)}
            placeholder="Add balance"
            className="balance-input"
          />
          <button onClick={handleAddBalance} className="add-balance-button">Add Balance</button>
        </div>
      </section>

      <section className="shop-featured-products">
        <h2>Featured Products</h2>
        <div className="shop-featured-product-list">
          {products.slice(0, 5).map(product => (
            <ProductItem key={product.id} product={product} onClick={handleProductClick} onView={handleViewProduct} />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="shop-category">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map(category => (
            <CategoryItem key={category.value} category={category} onClick={handleCategoryClick} />
          ))}
          <button className="reset-button" onClick={handleResetClick}>
            <img src={`${process.env.PUBLIC_URL}/refresh.png`} alt="Reset" className="reset-icon" />
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="shop-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </section>

      {/* Products List Section */}
      <section className="shop-products">
        <h2>Products</h2>
        <ProductList products={filteredProducts} onProductClick={handleProductClick} onViewProduct={handleViewProduct} />
        <div className="selected-item-count">
          <p>{selectedProducts.length} items selected</p>
        </div>
        <div className="shop-buttons">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="view-cart-button" onClick={handleViewCart}>
            View Cart
          </button>
        </div>
      </section>

      {/* Modal for Add to Cart Confirmation */}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ShopPage;
