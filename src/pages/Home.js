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
    <div className="home-container">
      <section className="home-banner">
        <img src={bannerImage} alt="ShopSavvy Banner" className="home-banner-image" />
      </section>
      <section className="home-hero">
        <div className="home-hero-content">
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className="home-hero-logo" />
          <h1>Welcome to ShopSavvy</h1>
          <p>Your one-stop shop for the latest products</p>
          <button className="home-shop-now" onClick={onShopClicked}>Shop Now</button>
          <div className="home-social-media">
            <a href="#" className="home-social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="home-social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="home-social-icon">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </section>

      <section className="home-featured-products">
        <h2>Featured Products</h2>
        <div className="home-product-list">
          <div className="home-product-item">
            <img src={process.env.PUBLIC_URL + '/product1.jpg'} alt="Product 1" className="home-product-image" />
            <p>Razer Basilisk V3</p>
          </div>
          <div className="home-product-item">
            <img src={process.env.PUBLIC_URL + '/product2.jpg'} alt="Product 2" className="home-product-image" />
            <p>GeForce RTX 4090</p>
          </div>
          <div className="home-product-item">
            <img src={process.env.PUBLIC_URL + '/product3.jpg'} alt="Product 3" className="home-product-image" />
            <p>ROG Pugio</p>
          </div>
        </div>
      </section>

      <section className="home-video-section">
        <h2>Promotional Video</h2>
        <p>Ultimate speed and precision with the Razer Viper Mini.</p>
        <div className="home-video-container">
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

      <section className="home-about-shopsavvy">
        <h2>About ShopSavvy</h2>
        <p>At ShopSavvy, we believe in providing our customers with the best products at unbeatable prices. Our curated selection features the latest in technology, gaming, and lifestyle products. We are dedicated to offering a seamless shopping experience with top-notch customer service. Join our community and discover why ShopSavvy is your ultimate destination for all your shopping needs.</p>
      </section>
    </div>
  );
};

export default Home;
