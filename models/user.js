const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { Product } = require("./schema"); // Import the Product Sequelize model
const { Order } = require("./schema"); // Import the Order Sequelize model
const { UserProduct } = require("./schema");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "UserId",
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Please enter a valid email.",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      if (value.length >= 6) {
        this.setDataValue("password", value);
      } else {
        throw new Error("Your password should be more than 6 characters!");
      }
    },
  },
});

// Define the association to Product for cart items
User.belongsToMany(Product, {
  through: UserProduct,
  foreignKey: "UserId",
});

Product.belongsToMany(User, {
  through: UserProduct,
  foreignKey: "ProductId",
});

// Define the association to Order
User.hasMany(Order, {
  foreignKey: "UserId",
});

Order.belongsTo(User, {
  foreignKey: "UserId",
});

User.sync();
module.exports = User;
