const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    async show(req, res, next) {
        try {
            console.log("");
            console.log("Search api ----------------------------------");
            console.log("req.query =", req.query);

            // Get query
            const key = req.query?.key?.trim();
            const sortType = req.query?.sortType?.trim();
            let gender = req.query?.gender?.trim();
            let limit = 3;
            let page = 1;

            // Validate query 
            if (gender == "all" || gender == "All"){ gender = ""; }
            if (parseInt(req.query?.limit) > 1) {
                limit = parseInt(req.query?.limit) || 10;
            }
            if (parseInt(req.query?.page) > 1) {
                page = parseInt(req.query?.page) || 1;
            }
            if (sortType !== "" && sortType !== undefined) {
                const sortTypeList = sortType.split(",")
                console.log("sortTypeList =", sortTypeList);
            }
    
            const startIndex = (page - 1) * limit;
            const searchType = []; // Biến để xác định loại tìm kiếm
            // Cases search -----------------------------------------------------------------
            // Case search user with Key and Gender
            if (gender !== "" && gender !== undefined && key !== "" && key !== undefined) {
                console.log("Type Search: Search with Key and Gender");
                searchType.push("Search with Key and Gender");
            }
            // Search user with key
            else if (key !== "" && key !== undefined) {
                console.log("Type Search: Search with key");
                searchType.push("Search with Key");
            }
            // Search user with Gender
            else if (gender !== "" && gender !== undefined) {
                console.log("Type Search: Search with Gender");
                searchType.push("Search with Gender");
            }
            // Show all user
            else {
                console.log("Type Search: Show all");
                searchType.push("Show all user");
            }
    
            // Init conditions search
            const conditions = {};
    
            // add condition key
            if (key) {
                conditions.$text = { $search: key};
                conditions.$or = [
                    {name: { $regex: key, $options: "i" }},
                ]; 
            }
    
            // add condition gender
            if (gender) {
                conditions.$or = [
                    {sex: { $regex: gender, $options: "i" }},
                ];
            }
            console.log("Điều kiện search = ", conditions);

            // let totalResults;
            // if ( Object.keys(conditions).length === 0 ) {
            //     totalResults = await User.find(conditions).countDocuments();
            //     console.log(totalResults);
            // }
            // totalResults = await User.find(conditions).countDocuments();

            const totalResults = await User.find(conditions).countDocuments();
            const data = await User.find(conditions).skip(startIndex).limit(limit).sort({ "name": 1 });

    
            // Vallidate data result 
            if (data.length === 0) {
                return res.status(200).send({ code: 13, message: "Data is empty!!!", data: [] });
            } 

            // Sort data -------
            
            console.log(
                "return data: ",
                data
            );

            // return list user to client
            return res.status(200).send({
                code: 12,
                data: data,
                type: searchType.join(", "),
                currentPage: page,
                totalPages: Math.ceil(totalResults / limit),
                totalResults: totalResults,
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Server error" });
        }
    }

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
