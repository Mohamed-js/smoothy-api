const express = require("express");

const registrations = require("./registrations");
const sessions = require("./sessions");
const products = require("./products");
const blogposts = require("./blogposts");

const app = express();

app.use(registrations);
app.use(sessions);
app.use(products);
app.use(blogposts);

// Set the root
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

module.exports = app;
