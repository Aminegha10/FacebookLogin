const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
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
app.post("/FacebookLogin", createUser);
app.get("/", (req, res) => {
  return res.send("hello world");
});

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
