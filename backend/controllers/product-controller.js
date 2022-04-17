// External module imports
const path = require('path');
const { validationResult } = require('express-validator');


// Internal module imports
const Product = require('../models/product');

// Get all products
const getProducts = async(req, res, next) => {
    let products;
    const { pageLimit, pageNumber, sortBy, ASC } = req.body;
    try {
        // Fetch all products
        if (sortBy === "price") {
            products = await Product.find({}).sort({ "price": (ASC ? 1 : -1) }).skip((pageNumber - 1) * pageLimit).limit(pageLimit);
        } else {
            products = await Product.find({}).sort({ "rating": (ASC ? 1 : -1) }).skip((pageNumber - 1) * pageLimit).limit(pageLimit);
        }
    } catch(err) {
        // Forward error to Error handler
        return next(err);
    }

    // Send responses back
    res.json({ products: products })
}


// Add new Product
const addProduct = async(req, res, next) => {
    // Validate the incoming request
    const errors = validationResult(req);

    // Get the uplaoded file
    const files = req.files;
    let imageIndex = 1;
    let file;
    let imagePaths = [];
    // For each image uploaded
    while (true) {
        if (files['image'+imageIndex]) {
            file = files['image'+imageIndex];

            const dest = "uploads/products/images/" + file.name;

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
            files['image'+imageIndex].path = dest;
            // To be set on the Product object
            imagePaths.push(dest);

            imageIndex++;
        } else
            break;
    }
    
    if (!errors.isEmpty()) {
        // Forward error to Error handler
        const error = new Error("Invalid inputs passed, please check the data being passed!");
        error.code = 422;
        return next(error);
    }

    // // Get name, email and password from request body
    const { name, description, price, category, subCategory, discount, rating } = req.body;

    let existingProduct;
    try {
        // Check if product exists for given product-name in the DB
        existingProduct = await Product.findOne({ name: name });
    } catch (err) {
        // Forward error to Error Handler
        const error = new Error("Looks like you encountered an error while trying to add this product. Please try again!");
        error.code = 500;
        return next(error);
    }

    if (existingProduct) {
        // Forward the error to the Error Handler
        const error = new Error("We found an existing product with this product-name, please do not add duplicate products!");
        error.code = 422;
        return next(error);
    }

    // Create new User instance using Schema
    const createdProduct = new Product({
        name,
        description,
        images: imagePaths,
        price,
        category,
        subCategory,
        discount,
        rating
    });

    try {
        // Add created user to the DB
        await createdProduct.save();
    } catch (err) {
        // Forward the error to the Error handler
        const error = new Error("We encountered an error while adding this product, please try again later!");
        error.code = 500;
        return next(error);
    }

    // Send back response
    res.status(201).json({ productId: createdProduct.id, productDetails: createdProduct });
}

exports.getProducts = getProducts;
exports.addProduct = addProduct;