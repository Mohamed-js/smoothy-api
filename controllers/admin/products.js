const { slugify, uploadImage } = require("../../helpers");
const Product = require("../../models/product");
const View = require("../../models/view");

const index = async (req, res) => {
  const views = await View.aggregate([
    {
      $match: {
        product: { $exists: true },
      },
    },
    {
      $group: {
        _id: "$product",
        product: { $last: "$product" },
        views: { $sum: 1 },
      },
    },
  ]);

  const products = await Product.populate(views, { path: "product" });

  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  const products = await Product.findOne({ _id: req.params.id });
  try {
    res.send(products);
  } catch (e) {
    res.status(500).send(e);
  }
};

const create = async (req, res) => {
  try {
    const image_url = await uploadImage(req);
    const product = new Product({
      ...req.body,
      slug: slugify(req.body.title),
      image: image_url,
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
