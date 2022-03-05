const ItemModel = require('./item.model')
const StockQuery = require('./stock.query');

const AddStock = (req, res, next) => {
    let arrayStock = req.body.purchaseArray;
    let billno = req.body.billno;
    let purchaseDate = req.body.purchaseDate;
    StockQuery.AddItemPurchase(arrayStock, billno, purchaseDate) //to add into purchase db 
        .then((response)=>{
            StockQuery.AddItemStock(arrayStock) // to do addition of stock of the item
                .then((response) => {
                    res.json({
                        data: response,
                        status: 200,
                        msg: "Successfully Added"
                    })
                })
                .catch((err) => {
                    return next({
                        msg: err,
                        status: 400
                    })
                })
        })
        .catch((err)=>{
            return next({
                msg: err,
                status: 400
            })
        })
}

// const AddItemType = (req, res, next) => {
//     let condition = {};
//     condition.itemType = req.body.itemType.toUpperCase().replaceAll(' ', '');
//     StockQuery.FindItemType(condition)
//         .then((data) => {
//             res.json({
//                 msg: "ItemType Added Successfully",
//                 data,
//                 status: 200
//             })
//         })
//         .catch((err) => {
//             console.log(err);
//             return next({
//                 msg: err,
//                 status: 400
//             })
//         })
// }

const AddItem = (req, res, next) => {
    StockQuery.AddNewItem(req.body.ItemName)
        .then((resolve) => {
            res.json({
                msg: "Successfully Added",
                status: 200
            })
        })
        .catch((err) => {
            return next({
                msg: err,
                status: 400
            })
        })

}

// const GetItemType = (req, res, next) => {
//     ItemTypeModel.find({}, (err, done) => {
//         if (err) {
//             return next({
//                 msg: err,
//                 status: 400
//             })
//         }
//         if (done && !done.length) {
//             return next({
//                 msg: "Items not found"
//             })
//         }
//         if (done) {
//             res.json({
//                 msg: "Successful",
//                 data: done,
//                 status: 400
//             })
//         }
//     })
// }

const GetItems = (req, res, next) => {
    ItemModel.find({}, (err, done) => {
        if (err) {
            return next({
                msg: err,
                status: 400
            })
        }
        if (done) {
            res.json({
                msg: "Successful",
                data: done,
                status: 200
            })
        }
    })
}

const SaleItems = (req,res,next)=>{
    let salesArray = req.body.purchaseArray;
    let billno = req.body.billno;
    let salesDate = req.body.salesDate
    StockQuery.ReduceStockItem(salesArray)
        .then((data)=>{
            StockQuery.AddItemSales(salesArray,billno,salesDate)
                .then((response)=>{
                    res.json({
                        status: 200,
                        msg: "Successfully Added to Sales Depo and stocks modified successfully",
                        data: response
                    })
                })
                .catch((err)=>{
                    return next ({
                        status : 400, 
                        msg : err
                    })
                })
        })
        .catch((err)=>{
            return next({
                status: 400,
                msg : err
            })
        })
}

module.exports = {
    AddStock,
    AddItem,
    GetItems,
    SaleItems
}