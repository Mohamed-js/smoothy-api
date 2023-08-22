const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const User = require("./user"); // Import the User Sequelize model
const Product = require("./product"); // Import the Product Sequelize model
const BlogPost = require("./blogpost"); // Import the BlogPost Sequelize model

const View = sequelize.define(
  "view",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "ViewId",
      autoIncrement: true,
    },
    isHomePage: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ip: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

// Define associations with User, Product, and BlogPost
View.belongsTo(User, {
  foreignKey: "user_id",
});

View.belongsTo(Product, {
  foreignKey: "product_id",
});

View.belongsTo(BlogPost, {
  foreignKey: "blogpost_id",
});

View.sync();

module.exports = View;
