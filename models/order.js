const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { Product } = require("./schema");
const { User } = require("./schema");
const { OrderItem } = require("./schema");

const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "OrderId",
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
    },
    UserId: {
      type: DataTypes.INTEGER,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Order.sync();
module.exports = Order;
