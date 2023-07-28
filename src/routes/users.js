const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UserController");

router.get('/', usersController.show);
router.post('/', usersController.createUser);

module.exports = router;
