const util = require("util");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(`${__dirname}/../../public/img`));
    },
    filename: (req, file, callback) => {
      const match = ["image/png", "image/jpeg"];
  
      if (match.indexOf(file.mimetype) === -1) {
        var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
        return callback(message, null);
      }
  
      var filename = `${Date.now()}-shinha-${file.originalname}`;
      callback(null, filename);
    //   console.log("callback ",callback(null, filename));
    }
});

console.log("storage :", storage);

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;