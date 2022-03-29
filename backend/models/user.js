const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    orders: [{ type: mongoose.Types.ObjectId, default: [], ref: 'Order' }],
    addresses: [{ type: mongoose.ObjectId, default: [], ref: 'Address' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);