const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true,
    },
    brandImage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('brands', brandSchema);
