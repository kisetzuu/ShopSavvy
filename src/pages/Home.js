import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const onShopClicked = () => {
    navigate('/shop');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <img src={process.env.PUBLIC_URL + '/nxQ_LogoN.png'} alt="NxQ Logo" className="hero-logo" />
          <h1>Welcome to ShopSavvy</h1>
          <p>Your one-stop shop for the latest products</p>
          <button className="shop-now" onClick={onShopClicked}>Shop Now</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
