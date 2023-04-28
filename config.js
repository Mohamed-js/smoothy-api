const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
var cors = require("cors");

require("dotenv").config();

function startServer() {
  const app = express();
  app.use(cors({ origin: "http://127.0.0.1:4200" }));
  app.use("/uploads", express.static("uploads"));
  app.use(express.json());
  app.use(routes);

  mongoose
    .connect(
      `mongodb+srv://atefhamosa:Lwwmt_zh967Cxh.@cluster0.q4thba8.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      app.listen(3000, () => {
        console.log(`listening on port ${3000}`);
      });
    });
}

module.exports = startServer;
