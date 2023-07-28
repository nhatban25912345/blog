const express = require("express");
const router = express.Router();

const usersController = require("../app/controllers/UserController");

router.get('/create', usersController.createUser);
router.post('/store', usersController.store);
router.get('/', usersController.show);

module.exports = router;
