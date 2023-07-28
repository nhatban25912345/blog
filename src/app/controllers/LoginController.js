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
              const token = jwt.sign(user.id, process.env.JWT_SECRET_KEY);
              console.log(`---Login return token: ${token}`);
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
    
    // signin(req, res) {
    //     User.findOne({
    //       username: req.body.username,
    //     })
    //       .populate("roles", "-__v")
    //       .exec((err, user) => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
      
    //         if (!user) {
    //           return res.status(404).send({ message: "User Not found." });
    //         }
      
    //         var passwordIsValid = bcrypt.compareSync(
    //           req.body.password,
    //           user.password
    //         );
      
    //         if (!passwordIsValid) {
    //           return res.status(401).send({ message: "Invalid Password!" });
    //         }
      
    //         const token = jwt.sign({ id: user.id },
    //           config.secret,
    //           {
    //             algorithm: 'HS256',
    //             allowInsecureKeySizes: true,
    //             expiresIn: 86400, // 24 hours
    //           });
      
    //         var authorities = [];
      
    //         for (let i = 0; i < user.roles.length; i++) {
    //           authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
    //         }
      
    //         req.session.token = token;
      
    //         res.status(200).send({
    //           id: user._id,
    //           username: user.username,
    //           email: user.email,
    //           roles: authorities,
    //         });
    //       });
    //   };
}   

module.exports = new LoginController;