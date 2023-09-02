const { Order, Product, User } = require("../../models/schema"); // Assuming you have defined Sequelize models for Order, Product, and User

const index = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: User,
        },
      ],
    });

    console.log(orders);
    res.send(orders);
  } catch (e) {
    res.status(500).send(e);
  }
};

const update = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    order.status = req.body.status;
    await order.save();

    res.send({ message: "Order updated.", order: order });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, update };
