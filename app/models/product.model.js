const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    ProductName: String,
    ProductDescription: String,
    ProductPrice: Number
}, {
        collection: 'Product',
        timestamps: true
    });

module.exports = mongoose.model('Product', ProductSchema);