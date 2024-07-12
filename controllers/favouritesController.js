const favouriteModel = require('../models/favourites');

module.exports.addFavorite = async function (req, res) {
    const { productId, remarks } = req.body;
    const memberId = res.locals.member_id;

    try {
        const message = await favouriteModel.addFavorite(memberId, productId, remarks);
        res.status(200).json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.removeFavorite = async (req, res) => {
    const favouriteId = req.body.favouriteId; // Adjust based on how you send the favoriteId

    try {
        const message = await favouriteModel.removeFavorite(favouriteId);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};  



module.exports.getFavorites = async function (req, res) {
    const member_id = res.locals.member_id;

    try {
        const favorites = await favouriteModel.getFavorites(member_id); 
        res.status(200).json({ favorites });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve favorites' });
    }
};


// module.exports.showPopularity = async function (req, res) {
//     try {
//         const favoriteCounts = await favouriteModel.getFavoriteCounts();
//         res.status(200).json({ favoriteCounts });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



module.exports.getFavoriteCounts = async (req, res) => {
    try {
        const favoriteCounts = await favouriteModel.getFavoriteCounts();
        res.status(200).json({ favoriteCounts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};