const User = require("../models/user");

const index = async (req, res) => {
  const user = await getUser(req);
  res.send(user.cart_items);
};

const create = async (req, res) => {
  try {
    const user = await getUser(req);
    const x = user.cart_items.findIndex((item) => {
      return item.product._id.toString() === req.body.product;
    });
    if (x >= 0) {
      user.cart_items[x].quantity += Number(req.body.quantity);
    } else {
      user.cart_items = [...user.cart_items, req.body];
      user.populate("cart_items.product");
    }

    await user.save();

    res.send({
      message: "Successfully Added",
      cart_items: user.cart_items,
    });
  } catch (e) {
    res.send({ error: e });
  }
};

const patch = async (req, res) => {
  try {
    const user = await getUser(req);
    const x = user.cart_items.findIndex((item) => {
      return item.product._id.toString() === req.params.id;
    });
    if (x >= 0) {
      user.cart_items[x].quantity -= 1;
    }
    await user.save();
    res.send({ message: "Successfully Minused", cart_items: user.cart_items });
  } catch (e) {
    res.send({ error: e });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await getUser(req);
    const cartItems = user.cart_items.filter(
      (item) => item.product._id.toString() != req.params.id
    );
    user.cart_items = cartItems;
    await user.save();
    res.send({
      message: "Successfully Removed",
      cart_items: user.cart_items,
    });
  } catch (e) {
    res.send({ error: e });
  }
};

module.exports = { index, create, destroy, patch };

const getUser = async (req) => {
  return await User.findById(req.userId).populate("cart_items.product");
};
