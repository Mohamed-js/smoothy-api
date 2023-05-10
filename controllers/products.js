const { slugify } = require("../helpers");
const cloudinary = require("cloudinary").v2;
const Product = require("../models/product");

cloudinary.config({
  cloud_name: "atefcloud",
  api_key: "824336462488539",
  api_secret: "pEGHRdxPduNoMq8eWAu3c361h7E",
});

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
    const response = await cloudinary.uploader.upload(req.file.path, {
      public_id: slugify(req.body.title),
    });
    const product = new Product({
      ...req.body,
      image: response.secure_url,
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
