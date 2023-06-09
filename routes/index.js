const express = require("express");

const registrations = require("./registrations");
const sessions = require("./sessions");
const products = require("./products");
const blogposts = require("./blogposts");
const cartitems = require("./cartitems");
const orders = require("./orders");

// Admin requires
const adminProducts = require("./admin/products");
const adminUsers = require("./admin/users");
const adminOrders = require("./admin/orders");

const app = express();

app.use(registrations);
app.use(sessions);
app.use(products);
app.use(blogposts);
app.use(cartitems);
app.use(orders);

// Admin routes
app.use("/admin", [adminProducts, adminUsers, adminOrders]);

// Set the root
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
