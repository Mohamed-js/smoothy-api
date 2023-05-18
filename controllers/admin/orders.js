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

module.exports = { index };
