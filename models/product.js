const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: Number,
    description: String,
    category: String,
    image: String,
    sold: {
      type: Boolean,
      default: false
    },
    dateOfSale: String
  });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
