const { query } = require('../database');

// Function to add a favorite
module.exports.addFavorite = async function (memberId, productId, remarks) {
    const sql = 'SELECT add_favorite($1, $2, $3) AS message';
    try {
        const result = await query(sql, [memberId, productId, remarks]);
        return result.rows[0].message;
    } catch (error) {
        throw new Error(`Error adding favorite: ${error.message}`);
    }
};

module.exports.removeFavorite = async function (favouriteId) {
    const sql = 'CALL delete_favourite($1)';
    try {
        await query(sql, [favouriteId]);
        return 'Favorite removed successfully';
    } catch (error) {
        throw new Error(`Error removing favorite: ${error.message}`);
    }
};

module.exports.getFavorites = async function(member_id) {
    try {
        const result = await query(`
            SELECT * FROM get_favorite_products($1)
        `, [member_id]);
        return result.rows;
    } catch (err) {
        console.error('Error retrieving favorites:', err);
        throw err;
    }
};


module.exports.getFavoriteCounts = async function () {
    const sql = 'SELECT * FROM get_favorite_counts()';
    try {
        const result = await query(sql);
        return result.rows;
    } catch (error) {
        throw new Error(`Error fetching favorite counts: ${error.message}`);
    }
};