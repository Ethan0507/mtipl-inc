const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, minlength: 20 },
    images: [{ type: String, required: true }],
    price: { type: Number, required:true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    discount: { type: Number, requried: true },
    rating: { type: Number, required: true, min: 0, max: 5 }
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);