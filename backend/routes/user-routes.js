// External module imports
const express = require('express');
const { check } = require('express-validator');

// Internal module imports
const userController = require('../controllers/user-controller');

// Create a router instance
const router = express.Router();

// Available user routes
router.get('/all', userController.getUsers);

router.post(
  '/new',
  [
    check('name')
      .not()
      .isEmpty(),
    check('email')
      .normalizeEmail()
      .isEmail(),
    check('password').isLength({ min: 6 })
  ],
  userController.signUp
);

router.post('/login', userController.login);


// User order routes
// router.post(
//   '/:userId/orders/new',

// )


// User Address routes
router.post('/:userId/order/new', userController.placeOrder);


// Export the user-router
module.exports = router;