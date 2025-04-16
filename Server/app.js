const express = require("express");
const dotenv = require("dotenv");
// const cors = require("cors");
const MongoDbConnection = require("./config/db");
const { createUser } = require("./Controller/facebook");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
// app.use(cors({ origin: "*" }));
app.use(express.json());

// Connect to MongoDB
MongoDbConnection();

// Routes
app.post("/facebookLogin", createUser); // lowercase route
app.get("/hello", (req, res) => {
  res.send("Hello world");
});

// Start server
const PORT = process.env.PORT || 1010;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
