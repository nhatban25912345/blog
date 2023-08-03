const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class UserController {

    // [GET] /users
    async show(req, res, next) {
        try {
            console.log(req.query);
            const key = req.query?.key?.trim();
            const gender = req.query?.gender?.trim();
            const page = parseInt(req.query?.page) || 1; // Trang hiện tại (mặc định là trang 1 nếu không có tham số)
            const limit = parseInt(req.query?.limit) || 10; // Số lượng kết quả trên mỗi trang (mặc định là 10 nếu không có tham số)

            const startIndex = (page - 1) * limit;
            // const endIndex = page * limit;

            const verifyEmptyData = (data) => {
                console.log("data.length =", data.length);
                if (data.length === 0) {
                    return res.status(200).send({ code: 13, message: "Data is empty!!!" });
                }
            }

            // Search user with Key and Gender
            if (gender !== "" && gender !== undefined && key !== "" && key !== undefined) {
                console.log("Search with Key and Gender");
                const totalResults = await User.countDocuments({
                    $text: { $search: key },
                    $or: [
                        { name: { $regex: key } },
                        { sex: { $regex: gender } }
                    ]
                });
                const data = await User.find({
                    $text: {
                        $search: key,
                    },
                    $or: [
                        { name: { $regex: key } },
                        { sex: { $regex: gender } }
                    ]
                }).skip(startIndex).limit(limit);;
                verifyEmptyData(data);
                return res.status(200).send({ 
                    code: 12,
                    data: data,
                    type: "Search with Key and Gender",
                    currentPage: page,
                    totalPages: Math.ceil(totalResults / limit)
                 });
            }

            // Search user with key
            else if (key !== "" && key !== undefined) {
                console.log("Search with key");
                const totalResults = await User.countDocuments({
                    $text: {
                        $search: key
                    },
                    name: { $regex: key },
                });
                const data = await User.find({
                    $text: {
                        $search: key
                    },
                    name: { $regex: key },
                }).skip(startIndex).limit(limit);;
                verifyEmptyData(data);
                return res.status(200).send({ 
                    code: 12, 
                    data: data, 
                    type: "Search with Key",
                    currentPage: page,
                    totalPages: Math.ceil(totalResults / limit)
                });
            }

            // Search user with Gender
            else if (gender !== "" && gender !== undefined) {
                console.log("Search with Gender");
                const totalResults = await User.countDocuments({
                    sex: { $regex: gender }
                });
                const data = await User.find({
                    sex: { $regex: gender }
                }).skip(startIndex).limit(limit);
                verifyEmptyData(data);
                return res.status(200).send({ 
                    code: 12, 
                    data: data, 
                    type: "Search with Gender",
                    currentPage: page,
                    totalPages: Math.ceil(totalResults / limit) 
                });
            }

            // Show all user
            else {
                console.log("Show all");
                const totalResults = await User.countDocuments({});
                const users = await User.find({}).skip(startIndex).limit(limit);;
                verifyEmptyData(users);
                console.log(totalResults);
                return res.status(200).send({ 
                    code: 12, 
                    data: users, 
                    type: "Show all user",
                    currentPage: page,
                    totalPages: Math.ceil(totalResults / limit) 
                });
            }
        }
        catch (err) {
            return res.status(500).send({ message: "Server error", error: err });
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
            req.body.hobby.length === 0
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
