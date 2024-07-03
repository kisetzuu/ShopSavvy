import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css';

const ProductItem = ({ product, onClick, isSelected }) => (
  <div className={`shop-product-item ${isSelected ? 'selected' : ''}`} onClick={() => onClick(product.id)}>
    <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className="shop-product-image" />
    <p>{product.name}</p>
  </div>
);

const CategoryItem = ({ category, onClick }) => (
  <div className="category-item" onClick={() => onClick(category.value)}>
    <img src={`${process.env.PUBLIC_URL}${category.image}`} alt={category.name} className="category-image" />
    <p>{category.name}</p>
  </div>
);

const ProductList = ({ products, selectedProducts, onProductClick }) => (
  <div className="shop-product-list-inline">
    {products.map(product => (
      <ProductItem
        key={product.id}
        product={product}
        onClick={onProductClick}
        isSelected={selectedProducts.includes(product.id)}
      />
    ))}
  </div>
);

const Cart = ({ cartItems, onRemoveItem, onEmptyCart }) => (
  <div className="shop-cart">
    <h2>Cart</h2>
    <div className="cart-items">
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          {item.name}
          <button className="remove-item-button" onClick={() => onRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
    {cartItems.length > 0 && (
      <button className="empty-cart-button" onClick={onEmptyCart}>Empty Cart</button>
    )}
  </div>
);

const ShopPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const onShopClicked = () => {
    navigate('/shop');
  };

  const bannerImage = `${process.env.PUBLIC_URL}/Geforce2.jpg`;

  const products = [
    { id: 1, category: 'razer', name: 'Razer Basilisk V3', image: '/product1.jpg' },
    { id: 2, category: 'rog', name: 'ROG Pugio', image: '/product2.jpg' },
    { id: 3, category: 'steelseries', name: 'SteelSeries Apex Pro', image: '/product3.jpg' },
    { id: 4, category: 'logitech', name: 'Logitech G Pro X', image: '/product4.jpg' },
    { id: 5, category: 'predator', name: 'Acer Predator Helios', image: '/product5.jpg' },
    { id: 6, category: 'razer', name: 'Razer BlackWidow V3', image: '/razer_black_widow_v3.jpg' },
    { id: 7, category: 'rog', name: 'ROG Delta', image: '/rog_delta.jpg' },
    { id: 8, category: 'steelseries', name: 'Steelseries Aerox', image: '/steelseries_aerox.jpg' },
    { id: 9, category: 'logitech', name: 'Logitech G29', image: '/logitech_g29.jpg' },
    { id: 10, category: 'predator', name: 'Acer Predator X45', image: '/acer_predator_x45.jpg' },
    { id: 11, category: 'razer', name: 'Razer Tartarus V2', image: '/razer_tartarus.jpg' },
    { id: 12, category: 'rog', name: 'ASUS ROG Strix XG27ACS', image: '/rog_asus_strix_xg.jpg' },
    { id: 13, category: 'steelseries', name: 'Steelseries Arctis 7P', image: '/steelseries_arctis7.jpg' },
  ];

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

  const handleAddToCart = () => {
    const selectedItems = products.filter(product => selectedProducts.includes(product.id));
    setCartItems(prevCartItems => [...prevCartItems, ...selectedItems.filter(item => !prevCartItems.includes(item))]);
    setSelectedProducts([]);
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevCartItems => prevCartItems.filter(item => item.id !== itemId));
  };

  const handleEmptyCart = () => {
    setCartItems([]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    (searchTerm ? product.name.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

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
            <ProductItem key={product.id} product={product} onClick={handleProductClick} isSelected={false} />
          ))}
        </div>
      </section>

      {/* Video Section */}
      <section className="shop-video-section">
        <iframe width="650" height="400" src="https://www.youtube.com/embed/qvSmM68xW5Q?si=agsNsXhg_f_gl8ZQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="650" height="400" src="https://www.youtube.com/embed/jgDvJ7lFhgE?si=d5Kl9BI5lEVSeLjT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <iframe width="650" height="400" src="https://www.youtube.com/embed/KMLv1H1UjSU?si=ATMwXDnjRg4Fyq2Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
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
        <button className="reset-button" onClick={handleResetClick}>
          <img src={`${process.env.PUBLIC_URL}/refresh.png`} alt="Reset" className="reset-icon" />
        </button>
      </section>

      {/* Products List Section */}
      <section className="shop-products">
        <h2>Products</h2>
        <ProductList products={filteredProducts} selectedProducts={selectedProducts} onProductClick={handleProductClick} />
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </section>

      {/* Cart Section */}
      <Cart cartItems={cartItems} onRemoveItem={handleRemoveItem} onEmptyCart={handleEmptyCart} />
    </div>
  );
};

export default ShopPage;
