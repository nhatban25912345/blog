const express = require("express");
const router = express.Router();

const uploadController = require("../app/controllers/UploadController");

// newsController.index

router.get('/', uploadController.formUpload);
router.post('/', uploadController.multipleUpload);

module.exports = router;