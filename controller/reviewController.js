// review Controller
import * as reviewModel from '../model/reviewModal.js';
export const getReviewsForProductController = async (req, res) => {
  const product_id = req.query.product_id; // Correct query parameter name
  if (!product_id) {
      return res.status(400).json({ message: 'productId is required' });
  }
  try {
      const reviews = await reviewModel.getReviewsForProduct(product_id);
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};
// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get review by ID
export const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await reviewModel.getReviewById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error('Error fetching review by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Create a new review
export const createReview = async (req, res) => {
  try {
    const { product_id, user_id, rating, comment } = req.body; //add review_title
    // Input validation (optional but recommended)
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Invalid rating. Rating must be between 1 and 5.' });
    }
    const newReview = await reviewModel.createReview(product_id, user_id, rating, comment); //add review_title
    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update a review
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id, user_id, rating, comment, review_title } = req.body; //add review_title
    // Input validation (optional but recommended)
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Invalid rating. Rating must be between 1 and 5.' });
    }
    const updatedReview = await reviewModel.updateReview(id, product_id, user_id, rating, comment, review_title); //add review_title
    if (updatedReview.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Delete a review
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await reviewModel.deleteReview(id);
    if (deletedReview.affectedRows === 0) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};