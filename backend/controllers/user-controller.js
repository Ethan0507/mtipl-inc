// External module imports
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

// Internal module imports
const User = require('../models/user');

// Get all users
// const getUsers = async(req, res, next) => {
//     let users;
//     try {
//         // Fetch all users from DB without the password field
//         users = await User.find({}, "-password");
//     } catch(err) {
//         // Forward error to Error handler
//         return next(err);
//     }

//     res.json({ users: users.map(user => user.toObject({ getters: true })) });
// }

const signUp = async(req, res, next) => {
    // Validate the incoming request
    const errors = validationResult(req);

    // Get the uplaoded file
    const file = req.files.image;
    // Set the destination folder to serve the uploaded file
    const dest = "uploads/images/" + file.name;

    // Validate if the file passed is of type - image
    const extensionName = path.extname(file.name); // fetch the file extension
    const allowedExtension = ['.png','.jpg','.jpeg'];
    if(!allowedExtension.includes(extensionName)){
        return res.status(422).send("Invalid Image");
    }

    // Save file in the destination folder
    file.mv(dest, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
    });

    // In the case of cleanup
    req.files.image.path = dest;

    if (!errors.isEmpty()) {
        // Forward error to Error handler
        return next(new Error("Invalid inputs passed, please check the data being passed!", 422));
    }

    // Get name, email and password from request body
    const { name, email, password } = req.body;

    let existingUser;
    try {
        // Check if user exists for given email in the DB
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        // Forward error to Error Handler
        const error = new Error("Looks like you encountered an error while trying to sign up. Please try again!", 500);
        return next(error);
    }

    if (existingUser) {
        // Forward the error to the Error Handler
        const error = new Error("We found an existing account for this email, please log in instead!", 422);
        return next(error);
    }

    let hashedPassword;
    try {
        // Generate a hash for the password
        hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
        // Forward the error to the Error handler
        return next(new Error("We encountered an error while create a new user, please try again later!", 500));
    }

    // Create new User instance using Schema
    const createdUser = new User({
        name,
        email,
        image: dest,
        password: hashedPassword,
        orders: []
    });

    try {
        // Add created user to the DB
        await createdUser.save();
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("We encountered an error while create a new user, please try again later!", 500);
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
        return next(new Error("Signing up failed, try again later!",500));
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
        const error = new Error("We could not find a user for the given email, please sign up instead!", 403);
        return next(error);
    }

    console.log("Reached");
    let isValidPassword;
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch (err) {
        // Forward the error to the Error handler
        return next(new Error("Could not log log you in, please check credentials and try again!", 500));
    }

    if (!isValidPassword) {
        // Forward the error to the Error handler
        const error = new Error("You have entered an incorrect password, could not log you in.", 403);
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
        return next(new Error("Login failed, please try again later!",500));
    }

    // Send back the response
    res.json({
        userId : existingUser.id ,
        email : existingUser.email,
        token : token
    });
}

// Export the user-controllers
// exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;