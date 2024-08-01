import express from "express";
import bodyParser from "body-parser";
import continentRouter from "./routes/continentRouter";
import formRouter from "./routes/formRouter";
import sequelize from "./config/database";

sequelize.sync({ force: true }).then(() => {
  console.log("db is ready");
});
const app = express();

app.use(bodyParser.json());
app.use("/api/continent", continentRouter);
app.use("/api/form", formRouter);

app.listen(3000, () => {
  console.log("app is running");
});
