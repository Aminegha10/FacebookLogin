const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.URI;
function MongoDbConnection() {
  mongoose
    .connect(URI)
    .then(() => {
      console.log(`Connected Successfully to MovieVault`);
    })
    .catch((error) => {
      console.error("Not Connected");
    });
}
module.exports = MongoDbConnection;
