const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require('dotenv');

dotenv.config();


verifyToken = (req, res, next) => {
  // test
  const token = "eyJhbGciOiJIUzI1NiJ9.NjRjMzJhZGI2Y2ZiOTg3NjlhNzhkMzZi.fwUMCLIiueRJppbmcGdXUKjXpNh5xrLAgP5eyju7J5Q";
  // const token = { token:"" };

  // console.log(req);
  // const token = req.headers.token;
  
  if (!token) {
    return res.status(500).send({ message: "No token provided!" });
  }

  jwt.verify(token,
            process.env.JWT_SECRET_KEY,
            (err, decoded) => {
              if (err) {
                console.log(decoded);
                return res.status(408).send({
                  message: "Unauthorized!",
                });
              }
              req.userId = decoded;
              console.log("---Take idUser at authenticator--------------");
              console.log(req.userId);
              next();
            });
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec()
    console.log("user: ", user);
    if (user!= undefined && user != null) {
      console.log(1111);
      next();
      return;
    }
    console.log("User undefinded");
    return res.status(500).json({ message: "Unkown user" });
  } 
  catch {
    return res.status(500).send({ error: "Server error" });
  }
  

};  

const authenticator = {
  verifyToken,
  isModerator,
};
module.exports = authenticator;