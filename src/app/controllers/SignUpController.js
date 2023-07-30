const User = require("../models/User");
const dotenv = require('dotenv');

class SignUpController {

    // [GET] /s
    index(req, res, next) {
        res.render("signUp");
    }

    // [POST] /login
    signUp(req, res, next) {
        // res.json("Sign up user complete");
        const formData = req.body;
        const newUser = new User(formData);
        newUser.save()
                .then(() => res.redirect("/"))
                .catch((error) => {
                });
    }
      
}   

module.exports = new SignUpController;