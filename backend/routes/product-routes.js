// External module imports
const express = require('express');
const { check } = require('express-validator');

// Internal module imports
const productController = require('../controllers/product-controller');

// Create a router instance
const router = express.Router();

// Available product routes
router.post(
  '/new',
  [
    check('name').notEmpty(),
    check('description').isLength({ min: 20 }),
    check('price').notEmpty(),
    check('category').notEmpty()
  ],
  productController.addProduct
);

router.post('/all', productController.getProducts);

// Export the user-router
module.exports = router;