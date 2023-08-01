const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {

    // [GET] /user
    async index(req, res, next) {
      try {
        const user = await User.findOne({ _id: req.userId }).exec();
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        return res.json(user);
      }
      catch(error) {
        // console.log("Error:", error);
        console.log("Lỗi ở đây");
        res.status(500).json({ message: "Internal server error" });
        return 
      }
    }
    
}   

module.exports = new ProfileController;