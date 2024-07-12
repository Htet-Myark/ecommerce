const reviewsModel = require('../models/reviews');

const createReview = async (req, res) => {
    const { productId, saleOrderId, rating, reviewText } = req.body;
    const memberId = res.locals.member_id; // Assuming the user's ID is available in the request object

    try {
        const result = await reviewsModel.createReview(memberId, productId, saleOrderId, rating, reviewText);
        res.status(201).json({ message: 'Review added successfully' });
    } catch (error) {
        if (error.message.includes('Review already exists for this product and order')) {
            res.status(400).json({ error: 'Review already exists for this product and order.' });
        } else if (error.message.includes('Order not completed or does not exist')) {
            res.status(400).json({ error: 'Order not completed or does not exist.' });
        } else {
            res.status(500).json({ error: 'Failed to add review' });
        }
    }
};

const getAllReviews = async (req, res) => {
    const memberId = res.locals.member_id;

    try {
        const reviews = await reviewsModel.getAllReviews(memberId);
        console.log('Reviews returned to client:', reviews); // Log the reviews before sending to client
        res.status(200).json({ reviews });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReview = async (req, res) => {
    const memberId = res.locals.member_id;
    const reviewId = req.params.reviewId; // Correctly get reviewId from req.params

    try {
        const review = await reviewsModel.getReview(reviewId, memberId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json({ review });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    const memberId = res.locals.member_id;
    const { reviewId } = req.params;
    const { rating, reviewText } = req.body;

    if (!rating || !reviewText) {
        return res.status(400).json({ error: 'Rating and review text are required.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        await reviewsModel.updateReview(reviewId, memberId, rating, reviewText);
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    const memberId = res.locals.member_id;
    const reviewId = req.params.reviewId;

    try {
        await reviewsModel.deleteReview(reviewId, memberId);
        res.status(204).send(); // No content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
};
