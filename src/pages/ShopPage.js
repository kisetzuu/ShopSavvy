import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const navigate = useNavigate();

  const onShopClicked = () => {
    navigate('/shop');
  };

  return (
    <div className="shop-page">
      <div
        className="hero"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/NxQ_Shop_Banner3.jpg'})`,
        }}
      >
        <div className="hero-content">
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className="hero-logo" />
          <h1>Welcome to ShopSavvy</h1>
          <p>Your one-stop shop for the latest products</p>
          <button className="shop-now" onClick={onShopClicked}>Shop Now</button>
        </div>
      </div>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-list">
          <div className="product-item">
            <img src={process.env.PUBLIC_URL + '/product1.jpg'} alt="Product 1" className="product-image" />
            <p>Razer Basilisk V3</p>
          </div>
          <div className="product-item">
            <img src={process.env.PUBLIC_URL + '/product2.jpg'} alt="Product 2" className="product-image" />
            <p>GeForce RTX 4090</p>
          </div>
          <div className="product-item">
            <img src={process.env.PUBLIC_URL + '/product3.jpg'} alt="Product 3" className="product-image" />
            <p>ROG Pugio</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
