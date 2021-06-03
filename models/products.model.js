const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    category: { type: String, required: true }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;