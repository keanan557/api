// review modal
import { pool } from '../config/config.js'; // Adjust the path as needed
export const getReviewsForProduct = async (product_id) => {
  try {
    const [rows] = await pool.query(`
SELECT review_id,product_id,rating,comment, users.name
FROM reviews
INNER JOIN users
ON reviews.user_id = users.user_id
      WHERE product_id = ?;
    `, [product_id]);
    console.log("Fetched Reviews:", rows); // Debugging
    return rows;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};
// Get all reviews
export const getAllReviews = async () => {
  const [rows] = await pool.query('SELECT * FROM reviews');
  return rows;
};
// Get review by ID
export const getReviewById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM Reviews WHERE review_id = ?', [id]);
  return rows[0];
};
// Create a new review
// Create a new review (Model) with user name
export const createReview = async (product_id, user_id, rating, comment) => {
  const [result] = await pool.query(
      'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
      [product_id, user_id, rating, comment]
  );
  const reviewId = result.insertId;

  const [rows] = await pool.query(`
      SELECT reviews.review_id, reviews.product_id, reviews.rating, reviews.comment, users.name
      FROM reviews
      INNER JOIN users ON reviews.user_id = users.user_id
      WHERE reviews.review_id = ?
  `, [reviewId]);

  return rows[0]; // Return the review with user name
};
// Update a review
export const updateReview = async (id, product_id, user_id, rating, comment) => { //add review_title
  const [result] = await pool.query(
    'UPDATE Reviews SET product_id = ?, user_id = ?, rating = ?, comment = ? WHERE review_id = ?', //add review_title
    [product_id, user_id, rating, comment, id] //add review_title
  );
  return result;
};
// Delete a review
export const deleteReview = async (id) => {
  const [result] = await pool.query('DELETE FROM Reviews WHERE review_id = ?', [id]);
  return result;
};