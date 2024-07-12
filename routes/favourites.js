const express = require('express');
const router = express.Router();
const favouriteController = require('../controllers/favouritesController');
const jwtMiddleware = require('../middleware/jwtMiddleware');



router.use(jwtMiddleware.verifyToken);
router.post('/create',  favouriteController.addFavorite);
router.get('/', favouriteController.getFavorites);
router.delete('/delete', favouriteController.removeFavorite);



router.get('/popularity', favouriteController.getFavoriteCounts);

module.exports = router;