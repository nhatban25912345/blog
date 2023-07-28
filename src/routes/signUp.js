const express = require("express");
const router = express.Router();
const middleware = require("../app/middleware")
const checkDuplicateUsernameOrEmail = middleware.checkDuplicateUsernameOrEmail;
console.log(typeof(checkDuplicateUsernameOrEmail));
const signUpController = require("../app/controllers/SignUpController");

router.get('/', signUpController.index);
router.post('/', checkDuplicateUsernameOrEmail, signUpController.signUp);

module.exports = router;