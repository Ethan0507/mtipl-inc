// External module imports
const express = require('express');
const { check } = require('express-validator');

// Internal module imports
const productController = require('../controllers/product-controller');

// Create a router instance
const router = express.Router();

// Available user routes
// router.get('/all', productController.getUsers);

// router.post(
//   '/new',
//   [
//     check('name')
//       .not()
//       .isEmpty(),
//     check('email')
//       .normalizeEmail()
//       .isEmail(),
//     check('password').isLength({ min: 6 })
//   ],
//   productController.signUp
// );

router.post('/all', productController.getProducts);

// Export the user-router
module.exports = router;