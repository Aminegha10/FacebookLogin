const express = require("express");
const profileRouter = express.Router();
const { createProfile } = require("../Controller/profile_controller");

profileRouter.post("/create", createProfile);

module.exports = profileRouter;
