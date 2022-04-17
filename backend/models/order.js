const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    totalAmount: { type: Number, required: true },
    totalDiscount: { type: Number, default: 0},
    addressInfo: { type: String, required: true},
    cardName: { type: String, required: true},
    cardNumber: { type: String, required: true},
    expDate: { type: String, required: true },
    cvv: { type: String, required: true },
    city: { type: String, required: true},
    country: { type: String, required: true},
    cvv: { type: String, required: true},
    expDate: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    postalCode: { type: String, required: true},
    state: { type: String, required: true},
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: String, required: true }
});

orderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', orderSchema);