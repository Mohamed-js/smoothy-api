const { sequelize } = require("../config");
const { DataTypes } = require("sequelize");
const Order = require("./order");
const OrderItem = require("./orderitem");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "ProductId",
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    lowercase: true,
    validate: {
      len: {
        args: [3],
        msg: "Product name must not be less than 3 characters.",
      },
    },
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
    lowercase: true,
    validate: {
      len: {
        args: [3],
        msg: "Product name must not be less than 3 characters.",
      },
    },
  },
  price: {
    type: DataTypes.FLOAT, // You can use DECIMAL for precise currency handling
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3],
        msg: "Product description must not be less than 3 characters.",
      },
    },
  },
  ar_description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3],
        msg: "Product description must not be less than 3 characters.",
      },
    },
  },
  image: {
    type: DataTypes.STRING,
  },
});

Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "ProductId",
});

Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "OrderId",
});

Product.sync();

module.exports = Product;
