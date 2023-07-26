const User = require("../models/User");
const { multipleMongooseToObject } = require("../../util/mongoose");

class ProfileController {

    // [GET] /user
    index(req, res, next) {
        if (req.query.token != token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.json({});
    }

}   

module.exports = new ProfileController;