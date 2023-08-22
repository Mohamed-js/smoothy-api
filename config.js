const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://ptevpxcm:wydrFH4MYg0kEePAJwuaQTsKp39UzpAP@hansken.db.elephantsql.com/ptevpxcm"
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectDB, sequelize };
