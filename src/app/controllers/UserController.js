const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    async show(req, res, next) {
        try {
            console.log(req.query);
            const key = req.query?.key?.trim();
            let gender = req.query?.gender?.trim();
            if (gender === "all") {
                gender = "";
            }
            const page = parseInt(req.query?.page) || 1;
            const limit = parseInt(req.query?.limit) || 10;
    
            const startIndex = (page - 1) * limit;
            const searchType = []; // Biến để xác định loại tìm kiếm
    
            // Search user with Key and Gender
            if (gender !== "" && gender !== undefined && key !== "" && key !== undefined) {
                console.log("Search with Key and Gender");
                searchType.push("Search with Key and Gender");
            }
    
            // Search user with key
            else if (key !== "" && key !== undefined) {
                console.log("Search with key");
                searchType.push("Search with Key");
            }
    
            // Search user with Gender
            else if (gender !== "" && gender !== undefined) {
                console.log("Search with Gender");
                searchType.push("Search with Gender");
            }
    
            // Show all user
            else {
                console.log("Show all");
                searchType.push("Show all user");
            }
    
            // Init condition search
            const conditions = {};
    
            if (key) {
                conditions.$text = { $search: key }; // add condition key
            }
    
            if (gender) {
                conditions.$or = [
                    {name: { $regex: key }},
                    {sex: { $regex: gender }},
                ]; // add condition gender
            }
            console.log(conditions);
            
            const totalResults = await User.countDocuments(conditions);
            const data = await User.find(conditions).skip(startIndex).limit(limit).sort({ "name": 1 });
    
            if (data.length === 0) {
                return res.status(200).send({ code: 13, message: "Data is empty!!!" });
            }
            console.log({
                code: 12,
                data: data,
                type: searchType.join(", "),
                currentPage: page,
                totalPages: Math.ceil(totalResults / limit)
            });
            return res.status(200).send({
                code: 12,
                data: data,
                type: searchType.join(", "),
                currentPage: page,
                totalPages: Math.ceil(totalResults / limit)
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Server error" });
        }
    }
    

    // softUser {

    // }

    // [GET] /users/formCreate
    formCreate(req, res, next) {
        res.render('users/create');
    }

    // [POST] /users/create
    async create(req, res, next) {
        const formData = req.body;
        const newUser = new User(formData);
        try {
            await newUser.save();
            console.log("Created user " + req.body.username + " successfully!!!");
            res.status(200).send({ message: "Created user successfully!!!" });
        }
        catch (err) {
            res.status(408).send({ err: "Insert user Fail!!!" });
        }
    }

    // [POST] /users/update
    async update(req, res, next) {
        // console.log();
        const id = req.params.id;

        // validate data 
        if (
            req.body.role === "" ||
            req.body.username === "" ||
            req.body.password === "" ||
            req.body.name === "" ||
            req.body.sex === "" ||
            req.body.phoneNumber === "" ||
            req.body.email === "" ||
            req.body.hobby?.length === 0
        ) {
            return res.status(400).send({ code: 11, message: "Update user Fail, some data is empty!!!" });
        }

        try {
            console.log("id: ", id);
            await User.updateOne({ _id: id }, req.body);
            res.status(200).send({ message: "Update user successfully!!!" });
        }
        catch (err) {
            res.status(404).send({ code: 8, message: "Update user Fail, user not found!!!" });
        }
    }

    // [POST] /users/store
    async store(req, res, next) {
        const formDataCreate = req.body;
        const newUser = new User(formDataCreate);
        try {
            await newUser.save();
            console.log("Created user " + req.body.username + " successfully!!!");
            res.status(200).send({ message: "Created user successfully!!!" });
        }
        catch (err) {
            res.status(403).send({ err: "Insert user Fail!!!" });
        }
    }

    // [POST] /users/store
    destroy(req, res, next) {
        console.log(req.params);
        const id = req.params.id;
        console.log("id: ", id);
        // User.deleteOne({ _id: id})
        //     .then(() => {
        //         res.status(200).send({message: "Delete user successfully!!!"})
        //     })
        //     .catch(() => res.status(404).send({code: 9, message: "user not found" }))
        res.status(200).send({ message: "Delete user successfully!!!" });
        return;
    }

    // [GET] /
    async search(req, res, next) {
        // TODO: Implement search functionality
    }
}

module.exports = new UserController();
