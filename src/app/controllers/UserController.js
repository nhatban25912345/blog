const User = require("../models/User");
const db = require("../../config/db")

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
        // User.insert(
        //     {uid: 'uid'}, 
        //     {vehicle_status : 'vehicleSatus' },
        //     {multi:true}, 
        //       function(err, numberAffected){  
        //       });
        // db.users.insertOne( {} )
        try {
            console.log("---------1----------");
            console.log(db);
            db.users.insertOne(
                { "username": "shinha",
                "password": "metaway2023", },
                );
                // retur
            } catch (err) {
            res.status(408).json({err: "Insert user fail!!!"})
         }
    }

}   

module.exports = new UserController;