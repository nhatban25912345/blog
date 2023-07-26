const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

var token = "abc" + Math.floor(Math.random() * 1000);
setInterval(() => {
    token = "abc" + Math.floor(Math.random() * 1000);
}, 1200000);

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
            if (user) {
              //check if password matches
              const result = req.body.password === user.password;
              if (result) {
                res.json(token);
              } else {
                res.status(400).json({ error: "password doesn't match" });
              }
            } else {
              res.status(400).json({ error: "User doesn't exist" });
            }
          } catch (error) {
            res.status(400).json({ error: "lỗi ở cuối" });
          }
    }
}   

module.exports = new LoginController;