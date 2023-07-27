const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /user
    show(req, res, next) {
        User.find({})
        .then(users => res.json(users))
        .catch(next);
    }

    // post /user
    createUser(req, res, next) {
        User.updateOne(
            {uid: 'uid'}, 
            {vehicle_status : 'vehicleSatus' },
            {multi:true}, 
              function(err, numberAffected){  
              });
    }

}   

module.exports = new UserController;