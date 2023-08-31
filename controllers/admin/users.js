const { User, Order, Product } = require("../../models/schema");

const index = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Order,
          // include: [
          //   {
          //     model: Product,
          //     include: "product",
          //   },
          // ],
        },
      ],
    });

    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index };
