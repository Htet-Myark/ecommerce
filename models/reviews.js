const { query } = require('../database');



const createReview = async function(memberId, productId, saleOrderId, rating, reviewText) {
    const sql = 'SELECT create_review($1, $2, $3, $4, $5)';
    try {
        await query(sql, [memberId, productId, saleOrderId, rating, reviewText]);
        return { success: true };
    } catch (error) {
        if (error.message.includes('Review already exists for this product and order')) {
            throw new Error('Review already exists for this product and order.');
        } else if (error.message.includes('Order not completed or does not exist')) {
            throw new Error('Order not completed or does not exist.');
        }
        throw error;
    }
};


const getReview = async (reviewId, memberId) => {
    const sql = 'SELECT * FROM get_review($1, $2)';
    try {
        console.log(`EXECUTING QUERY | ${sql} [ ${reviewId}, ${memberId} ]`); // Log the query and parameters
        const result = await query(sql, [reviewId, memberId]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
};



const getAllReviews = async (memberId) => {
    const sql = 'SELECT * FROM get_all_reviews($1)';
    try {
        const result = await query(sql, [memberId]);
        console.log('Reviews from database:', result.rows); // Log the result for debugging
        return result.rows;
    } catch (error) {
        console.error('Error fetching reviews:', error); // Log any errors
        throw error;
    }
};

const updateReview = async (reviewId, memberId, rating, reviewText) => {
    const sql = 'SELECT update_review($1, $2, $3, $4)';
    try {
        await query(sql, [reviewId, memberId, rating, reviewText]);
        return { success: true };
    } catch (error) {
        console.error('Error updating review:', error);
        throw error;
    }
};

const deleteReview = async (reviewId, memberId) => {
    const sql = 'SELECT delete_review($1, $2)';
    await query(sql, [reviewId, memberId]);
};


module.exports = {
    createReview,
    getAllReviews,
    getReview,
    updateReview,
    deleteReview
};
