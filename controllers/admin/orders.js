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

const destroy = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).send({ message: "Order not found." });
    }

    await order.destroy();

    res.send({ message: "Order destroyed.", order: order });
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = { index, update, destroy };
