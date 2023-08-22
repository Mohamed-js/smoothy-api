require("dotenv").config();
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
// const { connectDB, sequelize } = require("./config");
const { initializeSocket } = require("./socket");

const app = express();

app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

try {
  // connectDB();
  app.listen(3000, () => console.log(`Listening on port ${3000}`));
} catch (e) {
  console.log(e);
}
