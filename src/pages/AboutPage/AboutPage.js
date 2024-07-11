import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about">
      <div className='about-intro'>
        <div className="text">
          <h1><p>Our Story</p></h1>
          Launched in 2024, ShopSavvy is on it's way to be the best premier online shopping
          marketplace with an active presence in different worldwide locations. Supported by a wide
          range of tailored marketing, data and service solutions, ShopSavvy has continued to gain
          numerous sellers, brand collaborations, and millions of customers all across the world.
          <p>
            ShopSavvy has a lot of diverse products to offer, growing with every single visit at a
            fast pace to ensure customer satisfaction. ShopSavvy offers a diverse assortment of products
            in categories which customers can freely explore for efficiency.
          </p>
        </div>
          <img
            loading="lazy"
            srcSet={process.env.PUBLIC_URL + '/nxq_LogoN.png'} alt='Logo' className='image'
          />
      </div>
      
      <section className="about-statistics">
        <div className='about-statistics-info-one'>
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/monthly-product-sales.png'} alt='Monthly Product Sales'
          />
          <div>
            <h2>52k</h2>
          </div>
          <div>
            Monthly Product Sales
          </div>
        </div>  
        
        <div className="about-statistics-info">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/customers-active.png'} alt='Customers Active'
          />
          <div>
            <h2>45.5k</h2>
          </div>
          <div>
            Active Customers
          </div>
        </div>

        <div className="about-statistics-info">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/annual-gross.png'} alt='Annual Gross Sales'
          />
          <div>
            <h2>25k</h2>
          </div>
          <div>
            Annual Gross Sale
          </div>
        </div>
      </section>

      <div className='about-people'>
        <div className='about-people-info'>
          <img
            src={process.env.PUBLIC_URL + '/member-example.png'} alt='Member 1' className='about-people-info-image'
          />
          <h5>Keith Chadberc Villanueva</h5>
          <div className='spacing'>
            Back-end Developer
          </div>
        </div>

        <div className='about-people-info'>
          <img
            src={process.env.PUBLIC_URL + '/member-example.png'} alt='Member 2' className='about-people-info-image'
          />
          <h5>Jeff Gabriel Leung</h5>
          <div className='spacing'>
            Back-end Developer
          </div>
        </div>

        <div className='about-people-info'>
          <img
            src={process.env.PUBLIC_URL + '/member-example.png'} alt='Member 3' className='about-people-info-image'
          />
          <h5>Mark John Toroy</h5>
          <div className='spacing'>
            Front-end Developer
          </div>
        </div>

        <div className='about-people-info'>
          <img
            src={process.env.PUBLIC_URL + '/member-example.png'} alt='Member 4' className='about-people-info-image'
          />
          <h5>Nicko Louis Adora</h5>
          <div className='spacing'>
            Front-end Developer
          </div>
        </div> 
      </div>

      <div className='about-assurance'> 
        <div className="about-assurance-width">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/free-fast-delivery.png'} alt='Free And Fast Delivery'
          />
          <p></p>
          <h5>FREE AND FAST DELIVERY</h5>
          Free delivery for all orders over $200
        </div>

        <div className="about-assurance-width">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/customer-service.png'} alt='Customer Service'
          />
          <p></p>
          <h5>24/7 CUSTOMER SERVICE</h5>
            Friendly 24/7 customer support
        </div>

        <div className="about-assurance-width">
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/money-back.png'} alt='Money Back'
          />
          <p></p>
          <h5>MONEY BACK GUARANTEE</h5>
            We return money within 30 days
        </div>
      </div>

      <div className='copyright'>
        <div className='copyright-image'>
          <img
            loading="lazy"
            src={process.env.PUBLIC_URL + '/copyright.png'} alt='Copyright Image'
          />
        </div>
        Copyright NexQ 2024. All rights reserved.
      </div>
    </div>
  );
};

export default AboutPage;