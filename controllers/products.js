const { Product } = require("../models/schema");

const index = async (req, res) => {
  try {
    Product.sync();
    const products = await Product.findAll();

    console.log(products);
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  try {
    const products = await Product.findOne({
      where: { slug: req.params.slug },
    });
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, show };
