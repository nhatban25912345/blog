const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /user
    index(req, res, next) {
        User.find({})
        .then(users => res.json(users))
        .catch(next);
    }

}   

module.exports = new UserController;