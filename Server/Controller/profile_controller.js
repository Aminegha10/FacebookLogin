const express = require("express");
const Profile = require("../Models/profile_model");
const mongoose = require("mongoose");

const createProfile = async (req, res) => {
  const { user_id, first_name, last_name, bio, avatar, fav_genre } = req.body;

  try {
    const newProfile = await Profile.create({
      user_id,
      first_name,
      last_name,
      avatar,
      bio,
      fav_genre,
    });

    res.status(200).json({ message: "Profile Created", newProfile });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createProfile };
