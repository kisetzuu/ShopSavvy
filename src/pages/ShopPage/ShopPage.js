// src/pages/ShopPage.js
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../services/Contexts';
import { auth, db, database } from '../../services/FirebaseConfig'; // Adjusted path based on your structure
import { collection, getDocs } from 'firebase/firestore';
import { ref, get, child, set } from 'firebase/database';
import Footer from '../../components/Footer'; // Import the new Footer component
import PromotionalSlider from '../../components/PromotionalSlider'; // Import the new PromotionalSlider component
import './ShopPage.css';
import ItemModal from './ItemModal/ItemModal';

const ProductItem = ({ product, onClick, onDoubleClick, onView, isSelected, isDoubleSelected }) => (
  <div
    className={`shop-product-item ${isSelected ? 'selected' : ''} ${isDoubleSelected ? 'double-selected' : ''}`}
    onClick={() => onClick(product.id)}
    onDoubleClick={() => onDoubleClick(product.id)}
  >
    <img src={product.image} alt={product.name} className="shop-product-image" />
    <p>{product.name}</p>
    <p>${product.price}</p>
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevents the parent onClick from firing
        onView(product.id);
      }}
    >
      View Product
    </button>
  </div>
);

const CategoryItem = ({ category, onClick }) => (
  <div className="category-item" onClick={() => onClick(category.value)}>
    <img src={category.image} alt={category.name} className="category-image" />
    <p>{category.name}</p>
  </div>
);

const ProductList = ({ products, onProductClick, onProductDoubleClick, onViewProduct, selectedProducts, doubleSelectedProducts }) => (
  <div className="shop-product-list-inline">
    {products.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
        onClick={onProductClick}
        onDoubleClick={onProductDoubleClick}
        onView={onViewProduct}
        isSelected={Array.isArray(selectedProducts) && selectedProducts.includes(product.id)}
        isDoubleSelected={Array.isArray(doubleSelectedProducts) && doubleSelectedProducts.some((doubleSelectedProduct) => doubleSelectedProduct.id === product.id)}
      />
    ))}
  </div>
);

const ShopPage = () => {
  const navigate = useNavigate();
  const { setCartItems } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [doubleSelectedProducts, setDoubleSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUserData = useCallback(
    async (currentUser) => {
      const dbRef = ref(database);

      try {
        // Fetch cart items
        const cartSnapshot = await get(child(dbRef, `carts/${currentUser.uid}`));
        if (cartSnapshot.exists()) {
          setCartItems(cartSnapshot.val().items || []);
        }

        // Fetch wishlist
        const wishlistSnapshot = await get(child(dbRef, `wishlists/${currentUser.uid}`));
        if (wishlistSnapshot.exists()) {
          setWishlist(wishlistSnapshot.val().items || []);
        }
      } catch (error) {
        console.error('Error fetching user data from Realtime Database:', error);
      }
    },
    [setCartItems]
  );

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchUserData(currentUser);
      } else {
        setCartItems([]);
        setWishlist([]);
      }
    });

    return () => unsubscribe();
  }, [fetchUserData, setCartItems]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
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
    if (Array.isArray(doubleSelectedProducts) && doubleSelectedProducts.some((product) => product.id === productId)) {
      setDoubleSelectedProducts(doubleSelectedProducts.filter((product) => product.id !== productId));
    } else if (Array.isArray(selectedProducts) && selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
      const product = products.find((product) => product.id === productId);
      setModalProduct(product);
      setShowModal(true);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleProductDoubleClick = (productId) => {
    const product = products.find((product) => product.id === productId);
    setModalProduct(product);
    setShowModal(true);
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleConfirmQuantity = () => {
    const updatedDoubleSelectedProducts = [...doubleSelectedProducts];
    const existingProductIndex = updatedDoubleSelectedProducts.findIndex(
      (product) => product.id === modalProduct.id
    );

    if (existingProductIndex !== -1) {
      updatedDoubleSelectedProducts[existingProductIndex].quantity = quantity;
    } else {
      updatedDoubleSelectedProducts.push({ ...modalProduct, quantity });
    }

    setDoubleSelectedProducts(updatedDoubleSelectedProducts);
    setShowModal(false);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to the cart.');
      navigate('/login');
      return;
    }

    const selectedItems = Array.isArray(selectedProducts) && selectedProducts.map((productId) => ({
      ...products.find((product) => product.id === productId),
      quantity: 1,
    }));

    try {
      const cartRef = ref(database, `carts/${user.uid}`);
      const cartSnapshot = await get(cartRef);

      let currentItems = [];
      if (cartSnapshot.exists()) {
        currentItems = cartSnapshot.val().items || [];
      }

      const newItems = [...currentItems, ...selectedItems, ...doubleSelectedProducts];

      await set(cartRef, { items: newItems });

      setCartItems(newItems);
      setSelectedProducts([]);
      setDoubleSelectedProducts([]);
      setQuantity(1); // Reset quantity after adding to cart
    } catch (error) {
      console.error('Error saving cart items to Realtime Database:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert('You must be logged in to add items to the wishlist.');
      navigate('/login');
      return;
    }

    const selectedItems = products.filter((product) => selectedProducts.includes(product.id));

    try {
      const wishlistRef = ref(database, `wishlists/${user.uid}`);
      const wishlistSnapshot = await get(wishlistRef);

      let currentWishlist = [];
      if (wishlistSnapshot.exists()) {
        currentWishlist = wishlistSnapshot.val().items || [];
      }

      const newWishlist = [...currentWishlist, ...selectedItems];

      await set(wishlistRef, { items: newWishlist });

      setWishlist(newWishlist);
      setSelectedProducts([]);
      setDoubleSelectedProducts([]);
      alert('Items added to wishlist.');
    } catch (error) {
      console.error('Error saving wishlist items to Realtime Database:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  // Pagination Logic
  const productsPerPage = 15;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          {products.slice(0, 5).map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={handleProductClick}
              onDoubleClick={handleProductDoubleClick}
              onView={handleViewProduct}
              isSelected={Array.isArray(selectedProducts) && selectedProducts.includes(product.id)}
              isDoubleSelected={Array.isArray(doubleSelectedProducts) && doubleSelectedProducts.some((doubleSelectedProduct) => doubleSelectedProduct.id === product.id)}
            />
          ))}
        </div>
      </section>

      {/* Add PromotionalSlider below Featured Products */}
      <PromotionalSlider />

      {/* Categories Section */}
      <section className="shop-category">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map((category) => (
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
        <ProductList
          products={displayedProducts}
          onProductClick={handleProductClick}
          onProductDoubleClick={handleProductDoubleClick}
          onViewProduct={handleViewProduct}
          selectedProducts={selectedProducts}
          doubleSelectedProducts={doubleSelectedProducts}
        />
      </section>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Selected Items Count and Cart Actions */}
      <div className="selected-item-count">
        <p>{selectedProducts.length + doubleSelectedProducts.length} items selected</p>
      </div>
      <div className="shop-buttons">
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="wishlist-button" onClick={handleAddToWishlist}>
          Add to Wishlist
        </button>
        <button className="view-cart-button" onClick={handleViewCart}>
          View Cart
        </button>
        <button className="list-product-button" onClick={() => navigate('/product-listing')}>
          List a Product
        </button>
      </div>

      {/* Modal for Entering Quantity */}
      <ItemModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        modalProduct={modalProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        handleConfirmQuantity={handleConfirmQuantity}
      />

      {/* Add Footer here */}
      <Footer />
    </div>
  );
};

export default ShopPage;
