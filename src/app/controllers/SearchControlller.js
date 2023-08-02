const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {

    // [GET] /search
    index(req, res) {
        res.render('search');
    }
    
}

module.exports = new SiteController;