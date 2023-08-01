const User = require("../models/User");

const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    show(req, res, next) {
        User.find({})
        .then(users => res.json(users))
        .catch(next);
    }

    // [GET] /users/formCreate
    formCreate(req, res, next) {
        res.render('users/create')
    }

    // [POST] /users/create
    create(req, res, next) {
        const formData = req.body;
        const newUser = new User(formData);
        newUser.save()
        .then(() => {
            console.log("Created user " + req.body.username + " successfully!!!");
            res.status(200).json({message: "Created user successfully!!!"});
        })
        .catch((err) => {
            res.status(408).json({err: "Insert user Fail!!!"})
        })
    }

    // [POST] /users/store
    store(req, res, next) {
        const formDataCreate = req.body;
        const newUser = new User(formDataCreate);
        newUser.save()
        .then(() => {
            console.log("Created user " + req.body.username + " successfully!!!");
            res.status(200).json({message: "Created user successfully!!!"});
        })
        .catch((err) => {
            res.status(403).json({err: "Insert user Fail!!!"})
        })
    }

    // [POST] /users/update
    update(req, res, next) {
        const id = req.params.id;
        const formDataUpdate = req.body;
        console.log("id: ", id);
        User.updateOne({ _id: id}, formDataUpdate)
            .then(() => {
                res.status(200).json({message: "Update user successfully!!!"})
            })
            .catch(next)
    }

    // [POST] /users/store
    destroy(req, res, next) {
        console.log(req.params);
        const id = req.params.id;
        console.log("id: ", id);
        User.deleteOne({ _id: id})
            .then(() => {
                res.status(200).json({message: "Delete user successfully!!!"})
            })
            .catch(next)
    }

}   

module.exports = new UserController;