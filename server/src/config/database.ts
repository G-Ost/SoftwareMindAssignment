const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("task-db", "user", "password", {
  dialect: "sqlite",
  host: "./task-db.sqlite",
});

module.exports = sequelize;
