const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class SiteController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then((course) => {
                res.render("courses/show", {course: mongooseToObject(course), } )
            })
            .catch(next);
    };

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    };

    // [POST] /courses/store
    async store(req, res, next) {
        const formData = req.body;
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDAp2L9EMhvMStemUEdRYEvs8VYeA`;
        const course = new Course(formData);
        course.save()
                .then(() => res.redirect('/'))
                .catch((error) => {
                    
                })
    };

}   

module.exports = new SiteController;