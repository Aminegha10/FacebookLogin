const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const ApiRouter = require("./Routes/apiRoutes");
const MongoDbConnection = require("./config/db");
const { createUser } = require("./Controller/facebook");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*", // toutes les origines
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
MongoDbConnection();
app.use("/v1", ApiRouter);
app.post("/FacebookLogin", createUser);
app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
