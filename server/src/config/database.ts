import { Sequelize } from "sequelize";

const sequelize = new Sequelize("task-db", "user", "password", {
  dialect: "sqlite",
  host: "./task-db.sqlite",
});

export default sequelize;
