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

    const userProducts = await UserProduct.findAll({
      where: {
        UserId: user.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    console.log(userProducts);
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    console.log("userProducts");
    const order = await Order.create({
      user_id: user.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      address: req.body.address,
    });

    userProducts.forEach(async (item) => {
      const orderItem = await OrderItem.create({
        OrderId: order.id,
        ProductId: item.ProductId,
        quantity: item.quantity,
        options: item.options,
      });
      console.log(orderItem);
    });

    await UserProduct.destroy({
      where: {
        UserId: req.userId,
      },
    });

    // Emit to admins
    const io = getIO();
    io.emit("new-order");
    // Send ok to user
    res.send({
      sad: "Successfully Placed Order",
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
