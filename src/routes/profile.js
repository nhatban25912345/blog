const express = require("express");
const router = express.Router();
const middleware = require("../app/middleware")

const profileController = require("../app/controllers/ProfileController");

// console.log(middleware.authenticator.isModerator);

router.get('/', middleware.authenticator.verifyToken, profileController.index);
// router.get('/', profileController.index);

module.exports = router;
