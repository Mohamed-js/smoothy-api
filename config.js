const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "development";

const connectDB = () => {
  mongoose.connect(
    env === "development" ? "mongodb://localhost:27017" : process.env.DB_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

module.exports = { connectDB };
