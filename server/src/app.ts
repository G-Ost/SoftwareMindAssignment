import express from "express";
import bodyParser from "body-parser";
import continentsRouter from "./routes/continentsRouter";
import formRouter from "./routes/formRouter";
import sequelize from "./config/database";
import helmet from "helmet";
import errorHandlerMiddleware from "./middleware/error-handler";

sequelize.sync().then(() => {
  console.log("db is ready");
});

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use("/api/continents", continentsRouter);
app.use("/api/form", formRouter);
app.use(errorHandlerMiddleware);

app.listen(3010, () => {
  console.log("app is running");
});
