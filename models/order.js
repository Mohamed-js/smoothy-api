const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  status: String,
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
      options: Map,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  first_name: String,
  last_name: String,
  country: String,
  city: String,
  phone: String,
  address: String,
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
