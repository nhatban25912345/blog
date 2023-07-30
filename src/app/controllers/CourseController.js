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
    store(req, res, next) {
        const formData = req.body;
        // formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDAp2L9EMhvMStemUEdRYEvs8VYeA`;
        formData.slug = req.body.videoId;
        const course = new Course(formData);
        console.log(11111);
        course
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => console.log(error));
    }

    // [GET] /courses/:id/edit
    edit(req, res, next){
        console.log(req.params);
        Course.findById(req.params.id)
            .then((course) => {
                res.render("courses/edit", {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)
    }

    // [PUT] /courses/:id
    update(req, res, next){
        console.log(req.params);
        // res.json(req.body)
        const formData = req.body;
        Course.updateOne({_id: req.params.id}, formData)
            .then(() => {
                console.log("updated");
                res.redirect("/me/stored/courses")
            })
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next){
        console.log(req.params);
        Course.deleteOne({_id: req.params.id})
            .then(() => {
                console.log("deleted");
                res.redirect("back")
            })
            .catch(next)
    }

}   

module.exports = new SiteController;