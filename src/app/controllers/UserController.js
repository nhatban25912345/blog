const User = require("../models/User");

const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    show(req, res, next) {
        User.find({})
        .then(users => res.json(users))
        .catch(next);
    }

    // [GET] /users/create
    createUser(req, res, next) {
        res.render('users/create')
    }

    // [POST] /users/store
    store(req, res, next) {
        const user = new User(req.body);
        user.save()
        .then(() => {
            console.log("Created user " + req.body.username);
            res.redirect('/profile');
        })
        .catch((err) => {
                    res.status(408).json({err: "Insert user Fail!!!"})
                })
    }

}   

module.exports = new UserController;