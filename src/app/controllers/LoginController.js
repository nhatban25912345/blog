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
    async login(req, res, next) {
      try {
          // check if the user exists
          const user = await User.findOne({ username: req.body.username });
          console.log(user);
          if (user) {
            //check if password matches
            const result = req.body.password === user.password;
            if (result) {
              const token = jwt.sign(user.id, process.env.JWT_SECRET_KEY, 
                {
                // algorithm: 'HS256',
                // allowInsecureKeySizes: true,
                // expiresIn: 86400, // 24 hours
                }
              );
              console.log(`---Login return token: ${token}`);
              // req.session.token = token;
              res.json({token})
            } else {
              res.status(402).json({ error: "password doesn't match" });
            }
          } else {
            console.log(req.body);
            res.status(401).json({ error: "User doesn't exist" });
          }
        } catch (error) {
          res.status(400).json({ error: "lỗi ở cuối" });
      }
    }
}   

module.exports = new LoginController;