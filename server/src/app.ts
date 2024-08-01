const express = require("express");
const continentRouter = require("./routes/continentRouter");
const userRouter = require("./routes/userRouter");
const sequelize = require("./config/database");
import bodyParser from "body-parser";

sequelize.sync().then(() => {
  console.log("db is ready");
});
const app = express();

app.use(bodyParser.json());
app.use("/api/continent", continentRouter);
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("app is running");
});
