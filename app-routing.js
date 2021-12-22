const router = require("express").Router();
const userController = require('./user/user.controller');
const StockRoute = require('./stocks/stock.route');

router.post('/register',userController.register);
router.post('/login',userController.login)

router.use('/stock',StockRoute);


module.exports = router;