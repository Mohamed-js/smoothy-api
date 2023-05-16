const Order = require("../models/order");
const User = require("../models/user");

const index = async (req, res) => {
  const user = await User.findById(req.userId).populate("orders");
  await user.populate("orders.items.product");

  res.send(user.orders);
};

// Order status my be [pending, complete, closed]
const create = async (req, res) => {
  try {
    const user = await getUser(req);
    const cartItems = user.cart_items;

    const order = new Order({
      items: cartItems,
      status: "pending",
      user: req.userId,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      address: req.body.address,
    });
    order.save();

    user.cart_items = [];
    user.orders.push(order._id);

    await user.save();

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
//     const cartItems = user.cart_items.filter(
//       (item) => item.product._id.toString() != req.params.id
//     );
//     user.cart_items = cartItems;
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
  return await User.findById(req.userId);
};
