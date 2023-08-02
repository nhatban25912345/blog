const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();
class LogoutController {

    // [POST] /logout
    logout = async (req, res) => {
      // try {
      //   req.session = null;
      //   return res.status(200).send({ message: "You've been signed out!" });
      // } catch (err) {
      //   this.next(err);
      // }
    };
}   

module.exports = new LogoutController;