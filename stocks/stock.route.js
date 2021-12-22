const router = require('express').Router();
const { VerifyToken } = require('../middlewares/checkToken');
const StockController= require('./stock.controller');

router.post('/addStock',VerifyToken,StockController.AddStock);
router.post('/addItemType',VerifyToken,StockController.AddItemType);


module.exports= router