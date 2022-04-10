// External module imports
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');

// Internal module imports
const User = require('../models/user');
const Order = require('../models/order');

// Get all users
const getUsers = async(req, res, next) => {
    let users;
    try {
        // Fetch all users from DB without the password field
        users = await User.find({}, "-password");
    } catch(err) {
        // Forward error to Error handler
        return next(err);
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) });
}

const signUp = async(req, res, next) => {
    // Validate the incoming request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // Forward error to Error handler
        const error = new Error("Invalid inputs passed, please check the data being passed!");
        error.code = 422;
        return next(error);
    }

    // Get name, email and password from request body
    const { name, email, password } = req.body;

    let existingUser;
    try {
        // Check if user exists for given email in the DB
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        // Forward error to Error Handler
        const error = new Error("Looks like you encountered an error while trying to sign up. Please try again!");
        error.code = 500;
        return next(error);
    }

    if (existingUser) {
        // Forward the error to the Error Handler
        const error = new Error("We found an existing account for this email, please log in instead!");
        error.code = 422;
        return next(error);
    }

    let hashedPassword;
    try {
        // Generate a hash for the password
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("We encountered an error while create a new user, please try again later!");
        error.code = 500;
        return next(error);
    }

    // Create new User instance using Schema
    const createdUser = new User({
        name,
        email,
        password: hashedPassword,
        orders: []
    });

    try {
        // Add created user to the DB
        await createdUser.save();
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("We encountered an error while create a new user, please try again later!");
        error.code = 500;
        return next(error);
    }

    let token;
    try{
        // Create a new JSON token
        token = jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            'mtipl_supersecret_salt' ,
            {expiresIn : '1h'}
        );
    }catch(err) {
        // Forward the error to the Error handler
        const error = new Error("Signing up failed, try again later!");
        error.code = 500;
        return next(error);
    }

    // Send back response
    res.status(201).json({ userId: createdUser.id , email:createdUser.email , token : token });
}

const login = async(req, res, next) => {

    const { email, password } = req.body;

    let existingUser;
    try {
        // Fetch user with given email from the DB
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error( "Loggin in failed, please try again later.", 500);
        return next(error);
    }

    if (!existingUser) {
        // Forward the error to the Error handler
        const error = new Error("We could not find a user for the given email, please sign up instead!");
        error.code = 403;
        return next(error);
    }

    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("Could not log log you in, please check credentials and try again!");
        error.code = 500;
        return next(error);
    }

    if (!isValidPassword) {
        // Forward the error to the Error handler
        const error = new Error("You have entered an incorrect password, could not log you in.");
        error.code = 403;
        return next(error);
    }

    let token;
    try{
        // Create new JSON token
        token = jwt.sign({
        userId : existingUser.id ,
        email : existingUser.email
        },
        'mtipl_supersecret_salt',
        {expiresIn : '1h'});
    }catch(err) {
        // Forward the error to the Error handler
        const error = new Error("Login failed, please try again later!");
        error.code = 500;
        return next(error);
    }

    // Send back the response
    res.json({
        userId : existingUser.id ,
        email : existingUser.email,
        token : token
    });
}


const placeOrder = async(req, res, next) => {

    const { userId } = req.params;

    let user;
    try {
        // Fetch user from DB based on user id in the url
        user = await User.findOne({ _id: userId });
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("Encountered an error while trying to add address for user, please try again!");
        error.code = 500;
        return next(error);
    }

    if (!user) {
        // Forward the error to the Error handler
        const error = new Error("Could not find a user for the given user id");
        error.code = 403;
        return next(error);
    }

    // Get name, email and password from request body
    const { totalAmount, firstName, lastName, addressInfo, city, state, postalCode, country, totalDiscount, cardName, cardNumber, cvv, expDate, productId, productName, productPrice } = req.body;


    const createdOrder = new Order({
        firstName,
        lastName,
        addressInfo,
        city,
        state,
        postalCode,
        country,
        totalAmount,
        totalDiscount,
        cardName, 
        cardNumber,
        expDate,
        cvv,
        productId,
        productName,
        productPrice,
        user: user._id
    });

    try {
        await createdOrder.save();
      } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("Placing order failed, please try again later!");
        error.code = 403;
        return next(error);
      }
    
      res.status(201).json({ order: createdOrder });    
}

// Export the user-controllers
exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
exports.placeOrder = placeOrder;