const express = require("express");
const router = express.Router();

const profileController = require("../app/controllers/ProfileController");

// console.log(middleware.authenticator.isModerator);

router.get('/', profileController.index);
// router.get('/', profileController.index);

module.exports = router;
