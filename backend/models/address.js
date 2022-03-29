const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    label: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    addressInfo: { type: String, required: true, minlength: 8 },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: Number, required: true, min: 100000, max: 999999 },
    country: { type: String, required: true },
    isPrimary: { type: Boolean, default: false }
});

module.exports = mongoose.model('Address', addressSchema);