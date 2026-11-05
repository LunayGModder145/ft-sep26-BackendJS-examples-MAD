const productsController = require('../controllers/products.controller');
const router = require('express').Router();

router.get("{/:id}", productsController.getProduct);

module.exports = router;