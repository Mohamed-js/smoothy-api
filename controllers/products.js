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

  try {
    const products = await Product.find({});
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  try {
    const products = await Product.findOne({ slug: req.params.slug });
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, show };
