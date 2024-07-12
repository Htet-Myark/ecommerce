const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const checkCompletedOrderMiddleware = require('../middleware/checkCompletedOrderMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware.verifyToken);

// Route to create a review with middleware to check completed orders
router.post('/create', checkCompletedOrderMiddleware, reviewsController.createReview);
router.get('/retrieve/all', reviewsController.getAllReviews);
router.get('/retrieve/:reviewId', reviewsController.getReview);
router.put('/:reviewId', reviewsController.updateReview); // Add this line
router.delete('/:reviewId', reviewsController.deleteReview);

module.exports = router;
