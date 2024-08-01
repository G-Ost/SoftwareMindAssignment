const express = require("express");
const continentRouter = require("./routes/continentRouter");

const app = express();

app.use("/api/continent", continentRouter);

app.listen(3000, () => {
  console.log("app is running");
});
