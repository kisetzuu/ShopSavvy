// components/StarRating.jsx

import React from 'react';
import PropTypes from 'prop-types';

const StarRating = ({ rating, onRatingChange }) => {
  const handleClick = (newRating) => {
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{
            cursor: onRatingChange ? 'pointer' : 'default',
            color: star <= rating ? '#FFD700' : '#ccc',
            fontSize: '3rem', // Increase the font size for bigger stars
            margin: '0 5px' // Add some margin for spacing
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func
};

export default StarRating;
