const { DataTypes } = require("sequelize");
const { sequelize } = require("../config");

// const BlogPost = sequelize.define(
//   "blog_post",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       field: "BlogPostId",
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       lowercase: true,
//       validate: {
//         len: {
//           args: [5],
//           msg: "Blog Post name must not be less than 5 characters.",
//         },
//       },
//     },
//     slug: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       lowercase: true,
//       validate: {
//         len: {
//           args: [5],
//           msg: "Blog Post name must not be less than 5 characters.",
//         },
//       },
//     },
//     image: {
//       type: DataTypes.STRING,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: {
//           args: [5],
//           msg: "Blog Post description must not be less than 5 characters.",
//         },
//       },
//     },
//     body: {
//       type: DataTypes.ARRAY(DataTypes.JSONB), // You can also use TEXT instead of JSONB
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const PromoCode = sequelize.define("promo_code", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "PromoCodeId",
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // by_period || by_usage
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usageTimes: {
    type: DataTypes.INTEGER,
  },
  periodInDays: {
    type: DataTypes.INTEGER,
  },
  isOutdated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

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
      defaultValue: "pending",
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
    promo_code: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

const OrderItem = sequelize.define("order_item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "ProductId",
    autoIncrement: true,
  },
  OrderId: { type: DataTypes.INTEGER },
  ProductId: { type: DataTypes.INTEGER },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  options: {
    type: DataTypes.JSONB,
  },
});

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
        msg: "Product slug must not be less than 3 characters.",
      },
    },
  },
  category: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product category must not be less than 3 characters.",
      },
    },
  },
  ar_category: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product ar_category must not be less than 3 characters.",
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
  usage: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product usage must not be less than 3 characters.",
      },
    },
  },
  ar_usage: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product usage must not be less than 3 characters.",
      },
    },
  },
  ingredients: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product ingredients must not be less than 3 characters.",
      },
    },
  },
  ar_ingredients: {
    type: DataTypes.STRING,

    validate: {
      len: {
        args: [3],
        msg: "Product ingredients must not be less than 3 characters.",
      },
    },
  },
  image: {
    type: DataTypes.STRING,
  },
});

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

const UserProduct = sequelize.define("user_product", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "ProductId",
    autoIncrement: true,
  },
  UserId: { type: DataTypes.INTEGER },
  ProductId: { type: DataTypes.INTEGER },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
});

const View = sequelize.define(
  "view",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "ViewId",
      autoIncrement: true,
    },
    // BlogPostId: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0,
    // },
    UserId: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    // ProductId: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: 0,
    // },
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

// RELATIONS
Product.belongsToMany(Order, {
  through: OrderItem,
  foreignKey: "ProductId",
});

Order.belongsTo(User, {
  foreignKey: "UserId",
});

Order.belongsToMany(Product, {
  through: OrderItem,
  foreignKey: "OrderId",
});

User.belongsToMany(Product, {
  through: UserProduct,
  foreignKey: "UserId",
});

Product.belongsToMany(User, {
  through: UserProduct,
  foreignKey: "ProductId",
});

UserProduct.belongsTo(Product, {
  foreignKey: "ProductId",
});

User.hasMany(Order, {
  foreignKey: "UserId",
});

Product.hasMany(View, {
  foreignKey: "ProductId",
});

// View.belongsTo(User, {
//   foreignKey: "UserId",
// });

// View.belongsTo(Product, {
//   foreignKey: "ProductId",
// });

// SYNC ALL
// BlogPost.sync();
Order.sync({ alter: true });
OrderItem.sync({ alter: true });
Product.sync({ alter: true });
User.sync({ alter: true });
UserProduct.sync({ alter: true });
View.sync({ alter: true });
PromoCode.sync({ alter: true });

// EXPORT ALL
module.exports = {
  // BlogPost,
  Order,
  OrderItem,
  Product,
  User,
  UserProduct,
  View,
  PromoCode,
};
