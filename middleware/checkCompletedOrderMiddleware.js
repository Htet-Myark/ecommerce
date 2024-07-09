// middleware/checkCompletedOrderMiddleware.js
const reviewsModel = require('../models/reviews');

const checkCompletedOrderMiddleware = async (req, res, next) => {
    const memberId = res.locals.member_id; // Assuming the middleware sets this correctly
    const { productId } = req.body;

    try {
        // Check if the sale order is completed and belongs to the member
        const isValidOrder = await reviewsModel.checkCompletedOrder(memberId, productId);
        if (!isValidOrder) {
            return res.status(400).json({ error: 'You can only review completed orders.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = checkCompletedOrderMiddleware;