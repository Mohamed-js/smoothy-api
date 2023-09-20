const { Op } = require("sequelize");
const { PromoCode } = require("../../models/schema");

const index = async (req, res) => {
  try {
    const promoCodes = await PromoCode.findAll();

    res.send(promoCodes);
  } catch (e) {
    res.status(500).send(e);
  }
};

const show = async (req, res) => {
  // try {
  //   const products = await Product.findAll({
  //     include: [
  //       {
  //         model: View,
  //       },
  //     ],
  //   });
  //   res.send(products);
  // } catch (e) {
  //   res.status(500).send(e);
  // }
};

const create = async (req, res) => {
  try {
    const promoCode = await PromoCode.create({
      code: req.body.code,
      discount: Number(req.body.discount),
      type: req.body.type,
      usageTimes: Number(req.body.usageTimes),
      periodInDays: Number(req.body.periodInDays),
    });
    console.log(promoCode);
    res.send({ message: "Promocode created.", promoCode: promoCode });
  } catch (e) {
    res.status(500).send(e);
  }
};

const update = async (req, res) => {
  //   try {
  //     const product = await Product.findByPk(req.params.id);
  //     if (!product) {
  //       return res.status(404).send({ message: "Product not found." });
  //     }
  //     await product.update(req.body);
  //     res.send({ message: "Product updated.", product: product });
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
};

const destroy = async (req, res) => {
  //   try {
  //     const product = await Product.findByPk(req.params.id);
  //     if (!product) {
  //       return res.status(404).send({ message: "Product not found." });
  //     }
  //     await product.destroy();
  //     res.send({ message: "Product deleted." });
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
};

module.exports = { index, show, create, update, destroy };
