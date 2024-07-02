import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

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

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

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
        <div className="shop-product-list">
          {filteredProducts.map(product => (
            <div key={product.id} className="shop-product-item">
              <img src={`${process.env.PUBLIC_URL}${product.image}`} alt={product.name} className="shop-product-image" />
              <p>{product.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="shop-category">
        <h2>Categories</h2>
        <div className="category-list">
          {categories.map(category => (
            <div key={category.value} className="category-item" onClick={() => handleCategoryClick(category.value)}>
              <img src={`${process.env.PUBLIC_URL}${category.image}`} alt={category.name} className="category-image" />
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
