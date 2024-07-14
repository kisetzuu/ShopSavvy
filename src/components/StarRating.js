// src/components/StarRating.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './StarRating.css';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FontAwesomeIcon 
        key={i} 
        icon={faStar} 
        className={i <= rating ? 'star filled' : 'star'} 
      />
    );
  }
  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
