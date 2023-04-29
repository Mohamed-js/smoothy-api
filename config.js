const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");

require("dotenv").config();

function startServer() {
  const app = express();
  app.use(cors({ origin: "*" }));
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(routes);

  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(3000, () => {
        console.log(`listening on port ${3000}`);
      });
    });
}

module.exports = startServer;
