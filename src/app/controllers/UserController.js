const User = require("../models/User");

const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    async show(req, res, next) {
        try {
            console.log(req.query); 
            const key = req.query?.key?.trim();
            const gender = req.query?.gender?.trim();

            const verifyEmplyData = (data) => {
                if (data.length === 0) {
                    return res.status(200).json({ code: 13,  message: "Data is empty!!!"})
                }
            }
            
            // Search user with key
            if ( gender != "" && gender != undefined & key != "" && key != undefined) {
                console.log("Search with Key and Gender");
                const data = await User.find(
                    {
                        sex: {$regex:gender}
                    }
                ).sort({"sex":-1});
                verifyEmplyData(data);
                return res.status(200).json({code: 12, data: data, type: "Search with Key and Gender"});
            } 

            // Search user with key
            else if ( key != "" && key != undefined) {
                console.log("Search with key");
                const data = await User.find(
                    {
                        $text: {
                            $search : req.query.key
                        },
                        name: {$regex:req.query.key},
                    }
                ).sort({"sex":-1});
                verifyEmplyData(data);
                return res.status(200).json({code: 12, data: data, type: "Search with Key"});
            } 

            // Search user with Gender
            else if ( gender != "" && gender != undefined) {
                console.log("Search with Gender");
                const data = await User.find(
                    {
                        sex: {$regex:gender}
                    }
                ).sort({"sex":-1});
                verifyEmplyData(data);
                return res.status(200).json({code: 12, data: data, type: "Search with Gender"});
            } 

            // Show all user
            else {
                console.log("Show all");
                User.find({})
                .then(users => {
                    verifyEmplyData(users);
                    return res.json(users)
                })
                .catch(next);
            }

        }
        catch(err) {
            console.log(err);
            res.status(500).json({ message: "Server error", error: err });
        }
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

        // validate data 
        if ( req.params.role == "" || req.params.username == "" || req.params.password == "" || req.params.name == "" || req.params.sex == "" || req.params.phoneNumber == "" || req.params.email == "" || req.params.hobby === [] ) {
            return res.status(400).json({code: 11, message: "Update user Fail, some data is empty!!!" })
        }

        const formDataUpdate = req.body;
        console.log("id: ", id);
        User.updateOne({ _id: id}, formDataUpdate)
            .then(() => {
                res.status(200).json({message: "Update user successfully!!!"})
            })
            .catch(() => res.status(404).json({code: 8, message: "Update user Fail, user not found!!!" }))
    }

    // [POST] /users/store
    destroy(req, res, next) {
        console.log(req.params);
        const id = req.params.id;
        console.log("id: ", id);
        // User.deleteOne({ _id: id})
        //     .then(() => {
        //         res.status(200).json({message: "Delete user successfully!!!"})
        //     })
        //     .catch(() => res.status(404).json({code: 9, message: "user not found" }))
        res.status(200).json({message: "Delete user successfully!!!"});
        return;
    }

    // [GET] /
    async search(req, res, next) {
        
    }
}   

module.exports = new UserController;