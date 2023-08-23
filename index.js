require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const { initializeSocket } = require("./socket");

const app = express();

app.use(cors({ origin: "*" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(routes);

try {
  app.listen(4000, () => console.log(`Listening on port ${4000}`));
} catch (e) {
  console.log(e);
}
