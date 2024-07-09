const reviewsModel = require('../models/reviews');

const createReview = async (req, res) => {
    const memberId = res.locals.member_id; // Assuming the middleware sets this correctly
    const { productId, rating, reviewText, saleOrderId } = req.body;

    if (!productId || !rating || !reviewText || !saleOrderId) {
        return res.status(400).json({ error: 'Product ID, rating, review text, and sale order ID are required.' });
    }
    if (rating < 1 || rating > 5) {
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    try {
        const review = await reviewsModel.createReview(memberId, productId, saleOrderId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
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
    const { reviewId } = req.params;

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


module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview
};
