const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class MeController {

    // [GET] /courses/create
    async storedCourses(req, res, next) {
        await Course.find({})
                .then((courses) => {
                    res.render("me/stored-courses", {courses: multipleMongooseToObject(courses)});
                })
                .catch(next)
    };

}   

module.exports = new MeController;