const { Op } = require("sequelize");
const { slugify, uploadImage } = require("../../helpers");
const { Product, View } = require("../../models/schema");

const index = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: View,
        },
      ],
    });
    // const ids = products.map((product) => product.id);

    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create = async (req, res) => {
  try {
    const image_url = await uploadImage(req); // Assuming you have the uploadImage function defined
    const product = await Product.create({
      ...req.body,
      slug: slugify(req.body.title),
      image: image_url,
    });

    res.send({ message: "Product created.", product: product });
  } catch (e) {
    if (e.code) {
      res.status(500).send("hey");
    }
    res.status(500).send(e);
  }
};

const update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    await product.update(req.body);

    res.send({ message: "Product updated.", product: product });
  } catch (e) {
    res.status(500).send(e);
  }
};

const destroy = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }

    await product.destroy();
    res.send({ message: "Product deleted." });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, show, create, update, destroy };
