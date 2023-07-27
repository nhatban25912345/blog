const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
class LoginController {

    // [GET] /login
    index(req, res, next) {
        res.render("login");
    }

    // [post] /login
    async access(req, res, next) {
        try {
            // check if the user exists
            const user = await User.findOne({ username: req.body.username });
            console.log(user);
            if (user) {
              //check if password matches
              const result = req.body.password === user.password;
              if (result) {
                const token = jwt.sign(user.id, process.env.JWT_SECRET_KEY);
                res.json({token})
              } else {
                res.status(404).json({ error: "password doesn't match" });
              }
            } else {
              console.log(req.body);
              res.status(400).json({ error: "User doesn't exist" });
            }
          } catch (error) {
            res.status(406).json({ error: "lỗi ở cuối" });
          }
    }
}   

module.exports = new LoginController;