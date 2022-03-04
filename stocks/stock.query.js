const ItemModel = require('./item.model');
const PurchaseModel = require('./purchase.model');

// const StockModel = require('./stock.model')

// const FindItemType = (condition) => {
//     return new Promise((resolve, reject) => {
//         ItemTypeModel.findOne(condition, (err, done) => {
//             if (err) {
//                 return reject("Item type error occured")
//             }
//             if (done) {// checking if itemType is already in the DB
//                 return reject("Item type is already in the system")
//             }
//             if (!done) { //if not in the system, then add to the db.
//                 let ItemsModel = new ItemTypeModel({});
//                 ItemsModel.itemType = condition.itemType
//                 ItemsModel.save((err, done) => {
//                     if (err) {
//                         return reject(err)
//                     }
//                     else {
//                         resolve(done)
//                     }
//                 })
//             }
//         })
//     })
// }

const FindItemStock = (condition) => {
    return new Promise((resolve, reject) => {
        ItemModel.findOne(condition, (err, stock) => {
            if (err) {
                return reject("Not found")
            }
            else {
                resolve(stock)
            }
        })
    })
}

const AddItemPurchase= (itemArray,billno,purchaseDate)=>{
    return new Promise((resolve,reject)=>{
        let purchaseModel = new PurchaseModel({});
        purchaseModel.billno = billno;
        purchaseModel.purchaseDate = purchaseDate;
        purchaseModel.items = itemArray;
        let totalAmount = 0;
        itemArray.map((item)=>{
            console.log(typeof item.price,typeof item.quantity);
            let itemAmount = Number(item.price) * Number(item.quantity);
            totalAmount = totalAmount + itemAmount;
        });
        purchaseModel.totalAmount= totalAmount
        purchaseModel.save((err,done)=>{
            if(err){
                return reject(err)
            }
            if(done){
                resolve(done)
            }
        })

    })
}


const AddItemStock = (arrayStock) => {
    return new Promise((resolve, reject) => {
        let recievedItem = [];
        arrayStock.map((item) => {
            FindItemStock({ itemName: item.itemName })
                .then((stockItem) => {
                    stockItem.totalStock = parseInt(stockItem.totalStock) + Number(item.quantity);
                    stockItem.price.push(item.price);
                    stockItem.quantity.push(item.quantity);
                    stockItem.save((err, done) => {
                        // console.log("inside save",stockItem);
                        if (err) {
                            return reject("Not Saved")
                        }
                        if(done) {
                            recievedItem.push(stockItem);
                            if(recievedItem.length === arrayStock.length){
                                resolve(recievedItem);
                            }
                        }
                    })
                })
                .catch((err) => {
                    return reject(err)
                })
        })  
    })
}

const AddNewItem = (condition) => {
    return new Promise((resolve, reject) => {
        ItemModel.findOne(condition, (err, item) => {
            if (err) {
                return reject("Item addition error occured")
            }
            if (item) {
                return reject("Item already exists in the system")
            }
            if (!item) {
                let model = new ItemModel({});
                model.itemName = condition.itemName
                model.totalStock = 0
                model.save((err, done) => {
                    if (err) {
                        return reject(err)
                    }
                    else {
                        resolve(done)
                    }
                })
            }
        })
    })
}

module.exports = {
    AddNewItem,
    AddItemStock,
    FindItemStock,
    AddItemPurchase
}