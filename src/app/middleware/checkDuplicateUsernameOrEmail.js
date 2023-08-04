const User = require("../models/User");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
      // Kiểm tra tên người dùng trùng lặp
      const existingUsername = await User.findOne({ username: req.body.username }).exec();
      if (existingUsername) {
        return res.status(404).json({ code: 3, error: "Failed! Username was registered" });
      }
  
      // Kiểm tra email trùng lặp
      const existingEmail = await User.findOne({ email: req.body.email }).exec();
      if (existingEmail) {
        return res.status(404).json({ code: 4, error: "Failed! Email was registered!" });
      }

      // Kiểm tra sđt trùng lặp
      // const existingPhoneNumber = await User.findOne({ phoneNumber: req.body.phoneNumber }).exec();
      // console.log("existingPhoneNumber: ", existingPhoneNumber);
      // console.log("phoneNumber: ", req.body );
      // if (existingPhoneNumber) {
      //   return res.status(404).json({ code: 5, error: "Failed! phoneNumber was registered!" });
      // }

      // Nếu cả tên người dùng email và số điện thoại đều là duy nhất, tiếp tục middleware tiếp theo
      next();
      return;
    } catch (error) {
      console.log("Error:", error);
      res.status(500).send({ message: "Server error" });
    }
  };

module.exports = checkDuplicateUsernameOrEmail;