const { slugify, initCloudinary } = require("../helpers");
const Product = require("../models/product");

const index = async (req, res) => {
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

const create = async (req, res) => {
  const cloudinary = initCloudinary();
  try {
    const response = await cloudinary.uploader.upload(req.file.path, {
      public_id: slugify(req.body.title),
    });
    const product = new Product({
      ...req.body,
      slug: slugify(req.body.title),
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
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, show, create, update };
