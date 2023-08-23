const { Sequelize } = require("sequelize");
const { Pool } = require("pg");

const sequelize = new Sequelize(
  "postgres://broiiuai:CzfRVM0UD3TZLHImonkNLY0_W_EOPrWu@dumbo.db.elephantsql.com/broiiuai",
  {
    pool: {
      max: 20,
      min: 0,
      idle: 10000,
    },
  }
);

const connectDB = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  next();
};

function closeSequelizeConnection(req, res, next) {
  res.on("finish", () => {
    console.log("Connection has been closed successfully.");
    sequelize.close(); // Close the connection after response is sent
  });
  next();
}

module.exports = { connectDB, sequelize, closeSequelizeConnection };
