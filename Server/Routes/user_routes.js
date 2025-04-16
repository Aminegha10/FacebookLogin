const express = require("express");
const userRouter = express.Router();
const {
  createUser,
  getallUsers,
  deleteUser,
  editUser,
  Login,
} = require("../Controller/user_controller");

userRouter
  .post("/Create", createUser)
  .post("/Login", Login)
  .get("/getAll", getallUsers)
  .delete("/:id", deleteUser)
  .patch("/:id", editUser);

module.exports = userRouter;
