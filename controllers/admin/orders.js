const Order = require("../../models/order");

const index = async (req, res) => {
  const users = await Order.find({}).populate([
    {
      path: "items.product",
      model: "Product",
    },
    {
      path: "user",
      model: "User",
    },
  ]);

  res.send(users);
};

const update = async (req, res) => {
  try {
    const product = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      {
        new: true,
      }
    );

    await product.save();
    res.send({ message: "Order updated.", product: product });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, update };
