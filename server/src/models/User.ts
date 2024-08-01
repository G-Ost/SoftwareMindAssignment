import { DataTypes, Model } from "sequelize";
const sequelize = require("../config/database");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
