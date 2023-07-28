const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {

    // [GET] /user
    async index(req, res, next) {
      await User.findOne({ _id: req.userId })
        .then((user) => {
          // console.log("");
          // console.log("---Take user at ProfileController--------------");
          // console.log(user);
          return res.json(user)
        })
        .catch((error) => {
          res.status(406).json({ error: "Can't find user" });
        })
      // return res.json(user);
        
        // if (req.headers.token != token) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }

    }
    
}   

module.exports = new ProfileController;