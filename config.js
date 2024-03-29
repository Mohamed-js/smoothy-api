const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://broiiuai:CzfRVM0UD3TZLHImonkNLY0_W_EOPrWu@dumbo.db.elephantsql.com/broiiuai",
  {
    pool: {
      max: 2,
      min: 0,
      idle: 30000,
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

module.exports = { connectDB, sequelize };
