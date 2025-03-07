// reviewRoutes.js
import express from 'express';
import {
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    getReviewsForProductController // Add this import
} from '../controller/reviewController.js'; // Adjust the path as needed
const router = express.Router();
// Get all reviews
router.get('/api/reviews', getReviews);
// Get reviews for a specific product
router.get('/api/reviews/product', getReviewsForProductController); // New route
// Get review by ID
router.get('/api/reviews/:id', getReviewById);
// Create a new review
router.post('/api/reviews', createReview);
// Update a review
router.put('/api/reviews/:id', updateReview);
// Delete a review
router.delete('/api/reviews/:id', deleteReview);
export default router;