const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true, minlength: 20 },
    images: [{ type: String, required: true }],
    price: { type: Number, required:true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true, default: "None" },
    discount: { type: Number, requried: true, default: 0 },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 }
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);