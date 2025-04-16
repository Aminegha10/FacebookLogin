const User = require("../Models/user_model");

// SignUp
const createUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create new user
    const newUser = await User.create({
      email,
      password,
    });
    res
      .status(200)
      .json({ message: "User Created Successfully", user: newUser });
  } catch (error) {
    res.status(500).send("Failed to add User " + error);
  }
};

module.exports = { createUser };
