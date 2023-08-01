const User = require("../models/User");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      // Kiểm tra tên người dùng trùng lặp
      const existingUsername = await User.findOne({ username: req.body.username }).exec();
      if (existingUsername) {
        return res.status(409).json({ error: "Failed! Username was registered" });
      }
  
      // Kiểm tra email trùng lặp
      const existingEmail = await User.findOne({ email: req.body.email }).exec();
      if (existingEmail) {
        return res.status(409).json({ error: "Failed! Email was registered!" });
      }

      // Kiểm tra sđt trùng lặp
      const existingPhoneNumber = await User.findOne({ phonenumber: req.body.phonenumber }).exec();
      if (existingPhoneNumber) {
        return res.status(409).json({ error: "Failed! Phonenumber was registered!" });
      }

      // Nếu cả tên người dùng email và số điện thoại đều là duy nhất, tiếp tục middleware tiếp theo
      next();
      return;
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({ message: "Server error" });
    }
  };

module.exports = checkDuplicateUsernameOrEmail;