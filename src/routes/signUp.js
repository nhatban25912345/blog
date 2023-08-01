const express = require("express");
const router = express.Router();
const middleware = require("../app/middleware")
const checkDuplicateUsernameOrEmail = middleware.checkDuplicateUsernameOrEmail;

const signUpController = require("../app/controllers/SignupController");

router.get('/', signUpController.index);
router.post('/', checkDuplicateUsernameOrEmail, signUpController.signUp);

module.exports = router;