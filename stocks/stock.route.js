const router = require('express').Router();
const { VerifyToken } = require('../middlewares/checkToken');
const StockController= require('./stock.controller');

router.post('/addStock',VerifyToken,StockController.AddStock);
router.post('/addItem',VerifyToken,StockController.AddItem);
// router.post('/addItemType',VerifyToken,StockController.AddItemType);
// router.get('/getItemType',VerifyToken,StockController.GetItemType);
router.get('/getItems',VerifyToken,StockController.GetItems);
router.post('/saleStock',VerifyToken,StockController.SaleItems);

module.exports= router