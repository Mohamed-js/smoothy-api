const {
  UserProduct,
  User,
  Order,
  OrderItem,
  Product,
} = require("../models/schema");

const { getIO } = require("../socket");

const index = async (req, res) => {
  const userWithOrders = await User.findByPk(req.userId, {
    include: {
      model: Order,
      include: {
        model: OrderItem,
        include: Product,
      },
    },
  });
  res.send(userWithOrders);
};

const create = async (req, res) => {
  try {
    const user = await getUser(req);

    const UserProducts = user.products();

    const order = Order.create({
      items: UserProducts,
      status: "pending",
      user_id: req.userId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      address: req.body.address,
    });
    order.save();

    await UserProduct.destroy({
      where: {
        user_id: req.userId,
      },
    });

    await user.save();
    // Emit to admins
    const io = getIO();
    io.emit("new-order");
    // Send ok to user
    res.send({
      message: "Successfully Placed Order",
    });
  } catch (e) {
    res.send({ error: e });
  }
};

// const destroy = async (req, res) => {
//   try {
//     const user = await getUser(req);
//     const UserProducts = user.cart_items.filter(
//       (item) => item.product._id.toString() != req.params.id
//     );
//     user.cart_items = UserProducts;
//     await user.save();
//     res.send({
//       message: "Successfully Removed",
//       cart_items: user.cart_items,
//     });
//   } catch (e) {
//     res.send({ error: e });
//   }
// };

module.exports = { index, create };

const getUser = async (req) => {
  return await User.findByPk(req.userId, {
    include: {
      model: Product,
    },
  });
};
