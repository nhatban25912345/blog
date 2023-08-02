const express = require("express");
const router = express.Router();
const middleware = require("../app/middleware")
const checkDuplicateUsernameOrEmail = middleware.checkDuplicateUsernameOrEmail;

const usersController = require("../app/controllers/UserController");

router.get('/', usersController.show);
router.get('/create-user', usersController.formCreate);
router.post('/create-user',checkDuplicateUsernameOrEmail , usersController.create);
router.post('/store', usersController.store);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.destroy);
router.post('/search/:key', usersController.search);

module.exports = router;
