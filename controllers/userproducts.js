const UserProduct = require("../models/userproduct");
const Product = require("../models/product");
const User = require("../models/user");

const index = async (req, res) => {
  try {
    const user = await getUser(req);

    res.send(await user.getProducts());
  } catch (e) {
    res.send({ error: e });
  }
};

const create = async (req, res) => {
  try {
    const user = await getUser(req);
    const cartProduct = await UserProduct.findOne({
      where: {
        UserId: user.id,
        ProductId: req.body.product,
      },
    });
    if (cartProduct) {
      cartProduct.quantity += Number(req.body.quantity);
      await cartProduct.save();
    } else {
      await UserProduct.create({
        quantity: 1,
        UserId: user.id,
        ProductId: req.body.product,
      });
    }

    res.send({
      message: "Successfully Added",
      cart_items: await user.getProducts(),
    });
  } catch (e) {
    res.send({ error: e });
  }
};

const patch = async (req, res) => {
  try {
    const user = await getUser(req);

    const cartProduct = await UserProduct.findByPk(req.params.id);

    if (cartProduct) {
      cartProduct.quantity -= 1;
    }

    await cartProduct.save();
    cartProduct.reload();
    res.send({
      message: "Successfully Minused",
      cart_items: await user.getProducts(),
    });
  } catch (e) {
    res.send({ error: e });
  }
};

const destroy = async (req, res) => {
  try {
    const user = await getUser(req);
    const item = await UserProduct.findByPk(req.params.id);
    await item.destroy();
    res.send({
      message: "Successfully Removed",
      cart_items: await user.getProducts(),
    });
  } catch (e) {
    res.send({ error: e });
  }
};

module.exports = { index, create, destroy, patch };

const getUser = async (req) => {
  return await User.findByPk(req.userId);
};
