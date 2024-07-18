// src/components/PromotionalSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PromotionalSlider.css'; // Create a CSS file for custom styles

const PromotionalSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="promotional-slider">
      <Slider {...settings}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/razer_banner_naga.jpg`} alt="Razer Banner" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/rog_banner.jpg`} alt="ROG Banner" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/steelseries_2.jpg`} alt="Steelseries Banner" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/logitech_2.jpg`} alt="Logitech Banner" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/predator_banner_1.jpg`} alt="Logitech Banner" />
        </div>
      </Slider>
    </div>
  );
};

export default PromotionalSlider;
