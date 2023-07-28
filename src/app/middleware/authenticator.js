const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

dotenv.config();


verifyToken = (req, res, next) => {
  // test
  const token = "eyJhbGciOiJIUzI1NiJ9.NjRjMzJhZGI2Y2ZiOTg3NjlhNzhkMzZi.fwUMCLIiueRJppbmcGdXUKjXpNh5xrLAgP5eyju7J5Q";
  // const token = { token:"" };

  // console.log(req);
  // let token = req.headers.token;
  // console.log("eyJhbGciOiJIUzI1NiJ9.NjRjMDdmMzBkMTllYTkyODhkZDViODY1.nsj-LQDVeQ4oRRZa7JyhRkeBuegcRtiRPd26y94fBOY");
  
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            process.env.JWT_SECRET_KEY,
            (err, decoded) => {
              if (err) {
                console.log(decoded);
                return res.status(401).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded;
              console.log("---Take idUser at authenticator--------------");
              console.log(req.userId);
              next();
            });
};

// isModerator = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     };
//     next();
//   });
// };

const authenticator = {
  verifyToken,
  // isModerator,
};
module.exports = authenticator;