const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {
    
    // [GET] /user
    async index(req, res, next) {
        console.log("asdasd");
        return res.json("asdasd");
        // const user = await User.findOne({ _id: req.body.userId });
        
        // if (req.query.token != token) {
        //     return res.status(401).json({ error: 'Unauthorized' });
        // }

    }

}   

module.exports = new ProfileController;