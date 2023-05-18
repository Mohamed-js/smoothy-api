const { slugify, uploadImage } = require("../helpers");
const Product = require("../models/product");
const View = require("../models/view");
const env = process.env.NODE_ENV || "development";

const index = async (req, res) => {
  // const views = await View.aggregate([
  //   {
  //     $match: {
  //       product: { $exists: true },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: "$product",
  //       viewsCount: { $sum: 1 },
  //     },
  //   },
  // ]);
  // res.send(views);
  const products = await Product.find({});
  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  const products = await Product.findOne({ slug: req.params.slug });
  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, show };
