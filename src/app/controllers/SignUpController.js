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
        console.log("New User: ", newUser);
        newUser.save()
                .then(() => res.status(200).json({code: 10, message: "Sign up success!!!"}))
                .catch((error) => {
                    res.status(500).json({ message: "Server error" });
                });
    }
    
}   

module.exports = new SignUpController;