const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {

    // [GET] /user
    async index(req, res, next) {
      const user = await User.findOne({ _id: req.userId })
      console.log("");
      console.log("---Take user at ProfileController--------------");
      console.log(user);
      return res.json(user);
        
        // if (req.headers.token != token) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }

    }

    signin(req, res) {
        User.findOne({
          username: req.body.username,
        })
          .populate("roles", "-__v")
          .exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (!user) {
              return res.status(404).send({ message: "User Not found." });
            }
      
            var passwordIsValid = bcrypt.compareSync(
              req.body.password,
              user.password
            );
      
            if (!passwordIsValid) {
              return res.status(401).send({ message: "Invalid Password!" });
            }
      
            const token = jwt.sign({ id: user.id },
              config.secret,
              {
                algorithm: 'HS256',
                allowInsecureKeySizes: true,
                expiresIn: 86400, // 24 hours
              });
      
            var authorities = [];
      
            for (let i = 0; i < user.roles.length; i++) {
              authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }
      
            req.session.token = token;
      
            res.status(200).send({
              id: user._id,
              username: user.username,
              email: user.email,
              roles: authorities,
            });
          });
      };

}   

module.exports = new ProfileController;