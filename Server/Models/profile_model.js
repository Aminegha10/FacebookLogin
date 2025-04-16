const mongoose = require("mongoose");
const User = require("./user_model");

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];
const profileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    first_name: { type: String, default: "" },
    last_name: { type: String, default: "" },
    avatar: { type: String, default: "https://placehold.co/600x400" },

    bio: { type: String, default: "" },
    fav_genre: {
      type: [String],
      enum: genres,
      required: true, 
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
