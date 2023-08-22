const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

const BlogPost = sequelize.define(
  "blog_post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "BlogPostId",
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
      validate: {
        len: {
          args: [5],
          msg: "Blog Post name must not be less than 5 characters.",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      lowercase: true,
      validate: {
        len: {
          args: [5],
          msg: "Blog Post name must not be less than 5 characters.",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: "Blog Post description must not be less than 5 characters.",
        },
      },
    },
    body: {
      type: DataTypes.ARRAY(DataTypes.JSONB), // You can also use TEXT instead of JSONB
    },
  },
  {
    timestamps: true,
  }
);

BlogPost.sync();

module.exports = BlogPost;
