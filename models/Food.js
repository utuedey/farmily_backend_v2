// models/Food.js

const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Food', foodSchema);
