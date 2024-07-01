import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const navigate = useNavigate();

  const onShopClicked = () => {
    navigate('/shop');
  };

  const bannerImage = `${process.env.PUBLIC_URL}/Geforce2.jpg`;

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
          <div className="shop-product-item">
            <img src={`${process.env.PUBLIC_URL}/product1.jpg`} alt="Product 1" className="shop-product-image" />
            <p>Razer Basilisk V3</p>
          </div>
          <div className="shop-product-item">
            <img src={`${process.env.PUBLIC_URL}/product2.jpg`} alt="Product 2" className="shop-product-image" />
            <p>GeForce RTX 4090</p>
          </div>
          <div className="shop-product-item">
            <img src={`${process.env.PUBLIC_URL}/product3.jpg`} alt="Product 3" className="shop-product-image" />
            <p>ROG Pugio</p>
          </div>
          <div className="shop-product-item">
            <img src={`${process.env.PUBLIC_URL}/product4.jpg`} alt="Product 4" className="shop-product-image" />
            <p>ROG Ally 7</p>
          </div>
          <div className="shop-product-item">
            <img src={`${process.env.PUBLIC_URL}/product5.jpg`} alt="Product 5" className="shop-product-image" />
            <p>Acer Predator Helios</p>
          </div>
        </div>
      </section>

      {/* Single Category Section */}
      <section className="shop-category">
        <h2>Category</h2>
        <div className="category-item" data-category="razer">
          <img src={`${process.env.PUBLIC_URL}/razer.jpg`} alt="Razer" className="category-image" />
          <p>Razer</p>
        </div>
        <div className="category-item" data-category="rog">
          <img src={`${process.env.PUBLIC_URL}/rog.jpg`} alt="ROG" className="category-image" />
          <p>ROG</p>
        </div>
        <div className="category-item" data-category="rog">
          <img src={`${process.env.PUBLIC_URL}/steelseries.jpg`} alt="Steelseries" className="category-image" />
          <p>Steelseries</p>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
