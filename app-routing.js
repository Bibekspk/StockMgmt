const router = require("express").Router();
const userController = require('./user/user.controller');

router.post('/register',userController.register);
router.get('/login',userController.login)


module.exports = router;