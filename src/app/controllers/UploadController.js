const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");
const path = require("path");
const upload = require("../middleware/upload");

class SiteController {

    // [GET] /upload
    formUpload(req, res, next) {
        res.render("upload");
    }

    // [POST] /upload
    uploadFile(req, res, next) {
        console.log( path.join(`${__dirname}/../../public/img`));
        res.json("go here");
    }

    async multipleUpload(req, res) {
        try {
          await upload(req, res);
          console.log(req.files);
      
          if (req.files.length <= 0) {
            return res.send(`You must select at least 1 file.`);
          }
          return res.send(`Files has been uploaded.`);
        } catch (error) {
          console.log(error);
      
          if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.send("Too many files to upload.");
          }
          return res.send(`Error when trying upload many files: ${error}`);
        }
    };

}

module.exports = new SiteController;