const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    totalAmount: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0},
    deliveryAddress: { type: mongoose.Types.ObjectId, required: true, ref:'Address' }
    // List of products to be added here
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', orderSchema);