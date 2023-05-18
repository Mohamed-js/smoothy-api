const User = require("../../models/user");

const index = async (req, res) => {
  const users = await User.find({}).populate([
    {
      path: "orders",
      model: "Order",
      populate: {
        path: "items.product",
        model: "Product",
      },
    },
  ]);

  res.send(users);
};

module.exports = { index };
