// Internal module imports
const Product = require('../models/product');

const SORT_BY_MAP = {
    'rating': 'rating',
    'price': 'price'
};

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

exports.getProducts = getProducts;