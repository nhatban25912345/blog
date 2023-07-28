const User = require("../models/User");
const dotenv = require('dotenv');

class SignUpController {

    // [GET] /login
    index(req, res, next) {
        res.render("signup");
    }

    // [POST] /login
    signUp(req, res, next) {
        res.json("Sign up user complete");
    }
      
}   

module.exports = new SignUpController;