import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../services/FirebaseConfig';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../../services/AuthServices/AuthContext'; // Adjusted path based on your structure
import StarRating from '../../components/StarRating'; // Corrected import path
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [filterRating, setFilterRating] = useState(0);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', productId);
        const productDoc = await getDoc(productRef);
        if (productDoc.exists()) {
          setProduct(productDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsRef = collection(db, 'products', productId, 'reviews');
      const q = query(reviewsRef, orderBy('timestamp', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        const reviewsData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.rating = Number(data.rating); // Ensure rating is a number
          reviewsData.push({ id: doc.id, ...data });
        });
        console.log('Fetched reviews:', reviewsData); // Debugging log
        setReviews(reviewsData);
        setFilteredReviews(reviewsData);
      });
    };

    fetchReviews();
  }, [productId]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prevReview) => ({ ...prevReview, rating }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit a review.');
      return;
    }
    setReviewSubmitting(true);

    const reviewsRef = collection(db, 'products', productId, 'reviews');
    const newReviewData = {
      ...newReview,
      userId: user.uid,
      userName: user.displayName || user.email || 'Anonymous',
      timestamp: new Date(),
    };

    try {
      console.log('Submitting review:', newReviewData);
      await addDoc(reviewsRef, newReviewData);
      console.log('Review submitted successfully');
      setNewReview({ rating: 0, comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
    setReviewSubmitting(false);
  };

  const handleFilterChange = (e) => {
    const rating = Number(e.target.value);
    setFilterRating(rating);
    if (rating === 0) {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(reviews.filter(review => review.rating === rating));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>
      <div className="product-detail-image-container">
        <img src={product.image} alt={product.name} className="product-detail-image" />
      </div>
      <p className="price">Price: ${product.price}</p>
      <p className="description">{product.description}</p>
      <p className="stock">Stock: {product.stock}</p>
      <p className="user-email">Listed by: {product.userEmail || 'Admin'}</p>

      {/* Review Form */}
      <div className="review-section">
        <h2>Submit a Review</h2>
        <form onSubmit={handleReviewSubmit} className="review-form">
          <label htmlFor="rating">Rating:</label>
          <StarRating rating={newReview.rating} onRatingChange={handleRatingChange} />
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            name="comment"
            value={newReview.comment}
            onChange={handleReviewChange}
            required
          />
          <button type="submit" disabled={reviewSubmitting}>
            {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="review-section">
        <h2>Reviews</h2>
        <div className="filter-section">
          <label htmlFor="filter-rating">Filter by rating:</label>
          <select id="filter-rating" value={filterRating} onChange={handleFilterChange}>
            <option value="0">All</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>{rating} stars</option>
            ))}
          </select>
        </div>
        {filteredReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="review-list">
            {filteredReviews.map((review) => (
              <li key={review.id} className="review-item">
                <h3>{review.userName}</h3>
                <StarRating rating={review.rating} />
                <p>{review.comment}</p>
                <p className="review-date">{new Date(review.timestamp.seconds * 1000).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="back-button" onClick={() => navigate(-1)}>Back to Shop</button>
    </div>
  );
};

export default ProductDetailPage;
