const express = require("express");
const User = require("../Models/user_model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// SignUp
const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed_password = await bcrypt.hash(password, 10);

  try {
    // Check if email or username is already used
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("Email or username already used by another user.");
    }

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashed_password,
    });

    res
      .status(200)
      .json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "Username or email already in use" });
    }
    res.status(500).send("Failed to add User");
  }
};
// Login
const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(404).send({ message: "email or password missed" });
  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "email not found " });
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).send({ message: "password incorrect" });
    const accesstoken = jwt.sign(req.body, process.env.SECRET_KEY);
    return res
      .status(200)
      .send({ message: "Loged in Successfully", token: accesstoken });
  } catch (error) {
    res.status(500).send({ message: "error: " + error.message });
  }
};
const getallUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(201).json(getUsers);
  } catch (error) {
    console.error(error);
  }
};
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No customer found with this id: ${id}`);
    const deleteUser = await User.findByIdAndDelete(id);
    res.status(200).json(`User  Deleted Successfully`);
  } catch (error) {
    console.error(error);
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);

    // Handle duplicate key errors (e.g., duplicate email)
    if (error.code === 11000) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    res
      .status(500)
      .json({ error: "An error occurred while updating the user" });
  }
};

module.exports = { Login, createUser, getallUsers, deleteUser, editUser };
