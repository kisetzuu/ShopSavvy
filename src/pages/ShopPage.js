// src/pages/ShopPage.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../CartContext';
import { SavedToCartContext } from '../SavedToCartContext';
import { auth, db } from '../services/FirebaseConfig';
import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import './ShopPage.css';

const ProductItem = ({ product, onClick, onView }) => (
  <div className={`shop-product-item`} onClick={() => onClick(product.id)}>
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
  const { addToCart, cartItems, setCartItems, balance } = useContext(CartContext);
  const { saveToCart, savedItems, setSavedItems } = useContext(SavedToCartContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const cartDoc = await getDoc(doc(db, 'carts', currentUser.uid));
        if (cartDoc.exists()) {
          setCartItems(cartDoc.data().items || []);
        } else {
          setCartItems([]);
        }

        const savedDoc = await getDoc(doc(db, 'saved-to-cart', currentUser.uid));
        if (savedDoc.exists()) {
          setSavedItems(savedDoc.data().items || []);
        } else {
          setSavedItems([]);
        }
      } else {
        setCartItems([]);
        setSavedItems([]);
      }
    });

    return () => unsubscribe();
  }, [setCartItems, setSavedItems]);

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
    navigate(`/product/${productId}`); // Navigate to product detail page
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    const selectedItems = products.filter(product => selectedProducts.includes(product.id));
    const totalCost = selectedItems.reduce((total, product) => total + product.price, 0);

    if (totalCost > balance) {
      alert('Insufficient balance to add these items to the cart.');
      return;
    }

    // Merge with existing items in Firestore
    try {
      const cartRef = doc(db, 'carts', user.uid);
      const cartDoc = await getDoc(cartRef);
      let currentItems = [];
      if (cartDoc.exists()) {
        currentItems = cartDoc.data().items || [];
      }
      const newItems = [...currentItems, ...selectedItems];
      await setDoc(cartRef, { items: newItems, balance: balance - totalCost }, { merge: true });
      setCartItems(newItems); // Update context with new items
      setShowModal(true); // Show modal after adding to cart
      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      console.error("Error saving cart items to Firestore:", error);
    }
  };

  const handleSaveToCart = async () => {
    if (!user) {
      alert('You must be logged in to save items to the cart.');
      navigate('/login'); // Redirect to login page
      return;
    }

    const selectedItems = products.filter(product => selectedProducts.includes(product.id));
    try {
      const savedRef = doc(db, 'saved-to-cart', user.uid);
      const savedDoc = await getDoc(savedRef);
      let currentItems = [];
      if (savedDoc.exists()) {
        currentItems = savedDoc.data().items || [];
      }
      const newItems = [...currentItems, ...selectedItems];
      await setDoc(savedRef, { items: newItems }, { merge: true });
      setSavedItems(newItems); // Update context with new saved items
      setShowModal(true); // Show modal after saving to cart
      setSelectedProducts([]); // Clear selected products
    } catch (error) {
      console.error("Error saving items to Firestore:", error);
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

      <section className="shop-featured-products">
        <h2>Featured Products</h2>
        <div className="shop-featured-product-list">
          {products.slice(0, 5).map(product => (
            <ProductItem key={product.id} product={product} onClick={handleProductClick} onView={handleViewProduct} />
          ))}
        </div>
      </section>

      {/* Balance Display */}
      <section className="balance-section">
        <h2>Your Balance: ${balance}</h2>
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
          <button className="save-to-cart-button" onClick={handleSaveToCart}>
            Save to Cart
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
