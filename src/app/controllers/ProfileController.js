const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {

    // [GET] /user
    async index(req, res, next) {
      try {
        const user = await User.findOne({ _id: req.userId }).exec();
        if (!user) {
          return res.status(404).json({ code: 7, error: "User not found" });
        }
        return res.json(user);
      }
      catch(error) {
        res.status(500).json({ message: "Server error" });
        return 
      }
    }
    
}   

module.exports = new ProfileController;