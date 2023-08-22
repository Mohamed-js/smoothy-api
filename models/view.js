const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");
const { User } = require("./schema");
const { Product } = require("./schema");
const { BlogPost } = require("./schema");

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
