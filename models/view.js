const mongoose = require("mongoose");

const ViewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    blogpost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogPost",
    },
    isHomePage: {
      type: Boolean,
      default: false,
    },
    ip: String,
  },
  { timestamps: true }
);

const View = mongoose.model("View", ViewSchema);

module.exports = View;
