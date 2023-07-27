const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

dotenv.config();


verifyToken = (req, res, next) => {
  // test
  const token = { token:"eyJhbGciOiJIUzI1NiJ9.NjRjMmQ0MDk0YjBmNTdjZGNmNTI5N2Vj.PpbwcOPt03UejJ2rKe6AVr4uhUKnCsO04LZx8_PHFbw",};
  // const token = { token:"" };

  // console.log(req);
  // let token = req.headers.token;

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token.token,
            process.env.JWT_SECRET_KEY,
            (err, decoded) => {
              if (err) {
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