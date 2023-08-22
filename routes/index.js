const express = require("express");

const registrations = require("./registrations");
const sessions = require("./sessions");
const products = require("./products");
// const blogposts = require("./blogposts");
const UserProducts = require("./UserProduct");
const orders = require("./orders");
const auth = require("./auth");

// Admin requires
const adminProducts = require("./admin/products");
const adminUsers = require("./admin/users");
const adminOrders = require("./admin/orders");
const { connectDB, closeSequelizeConnection } = require("../config");

const app = express();

app.use(connectDB);
app.use(registrations);
app.use(sessions);
app.use(products);
// app.use(blogposts);
app.use(UserProducts);
app.use(orders);
app.use(auth);
app.use(closeSequelizeConnection);

// Admin routes
app.use("/admin", [adminProducts, adminUsers, adminOrders]);

// Set the root

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
