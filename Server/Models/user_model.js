const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: { type: String,  },
    password: { type: String,  },
  },
  { timestamps: true }
);
const User = mongoose.model("UserFacebook", userSchema);
module.exports = User;
