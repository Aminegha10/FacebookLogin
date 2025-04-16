const express = require("express");
const userRouter = require("./user_routes");
const profileRouter = require("./profile_routes");
const movieRouter = require("./userMovie_routes");
const ApiRouter = express.Router();

ApiRouter.use("/User", userRouter)
  .use("/Profile", profileRouter)
  .use("/Movie", movieRouter);

module.exports = ApiRouter;
