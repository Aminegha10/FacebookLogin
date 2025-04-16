const express = require("express");
const mongoose = require("mongoose");
const userMovieSchema = new mongoose.Schema(
  {
    profie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tmdbId: { type: Number, required: true },
    watched: { type: Boolean, default: false },
    toWatch: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserMovie = mongoose.model("UserMovie", userMovieSchema);

module.exports = UserMovie;
