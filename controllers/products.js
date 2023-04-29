const { imageUrlFormatter } = require("../helpers");
const Product = require("../models/product");

const index = async (req, res) => {
  const products = await Product.find({});
  try {
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const show = async (req, res, next) => {
  const products = await Product.findById(req.params.id);
  try {
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const create = async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      image: imageUrlFormatter(req),
    });

    await product.save();
    res.send({ message: "Product created.", product: product });
  } catch (e) {
    if (e.code) {
      res.status(500).send("hey");
    }
    res.status(500).send("hey2");
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    await product.save();
    res.send({ message: "Product updated.", product: product });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { index, show, create, update };
