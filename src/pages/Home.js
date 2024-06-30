import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const onShopClicked = () => {
    navigate('/shop');
  };

  const bannerImage = `${process.env.PUBLIC_URL}/Home_Banner_NxQ.jpg`;

  return (
    <div className="home">
      <section className="banner">
        <img src={bannerImage} alt="ShopSavvy Banner" className="banner-image" />
      </section>
      <section className="hero">
        <div className="hero-content">
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className="hero-logo" />
          <h1>Welcome to ShopSavvy</h1>
          <p>Your one-stop shop for the latest products</p>
          <button className="shop-now" onClick={onShopClicked}>Shop Now</button>
          <div className="social-media">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </section>

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

      <section className="video-section">
        <h2>Promotional Video</h2>
        <p>Ultimate speed and precision with the Razer Viper Mini.</p>
        <div className="video-container">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/rk5LTWHLQ7I" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </section>
    </div>
  );
};

export default Home;
