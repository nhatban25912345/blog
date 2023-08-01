const User = require("../models/User");

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Check for duplicate username
    const existingUsername = await User.findOne({ username: req.body.username }).exec();
    if (existingUsername) {
      return res.status(409).json({ error: "Failed! Username was registered" });
    }

    // Check for duplicate email
    const existingEmail = await User.findOne({ email: req.body.email }).exec();
    if (existingEmail) {
      return res.status(409).json({ error: "Failed! Email was registered!" });
    }

    // If both username and email are unique, proceed to the next middleware
    next();
    return; // Add this return statement
  } catch (error) {
    console.log("Error:", error);
    res.status(500).send({ message: "Server error" });
  }
};

module.exports = checkDuplicateUsernameOrEmail;