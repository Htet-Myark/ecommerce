const express = require('express');
const reviewsController = require('../controllers/reviewsController');
const checkCompletedOrderMiddleware = require('../middleware/checkCompletedOrderMiddleware');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.use(jwtMiddleware.verifyToken);

// Route to create a review with middleware to check completed orders
router.post('/create', checkCompletedOrderMiddleware, reviewsController.createReview);
router.get('/', reviewsController.getAllReviews);
router.get('/:reviewId', reviewsController.getReview);
router.put('/:reviewId', reviewsController.updateReview); // Add this line

module.exports = router;
