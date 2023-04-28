const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
    minlength: [3, "Product name must not be less than 3 characters."],
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: [3, "Product description must not be less than 3 characters."],
  },
  image: {
    type: String,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
