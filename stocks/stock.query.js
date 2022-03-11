const ItemModel = require('./item.model');
const PurchaseModel = require('./purchase.model');
const SalesModel = require('./sales.model');

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

const AddItemPurchase = (itemArray, billno, purchaseDate) => {
    return new Promise((resolve, reject) => {
        let purchaseModel = new PurchaseModel({});
        purchaseModel.billno = billno;
        purchaseModel.purchaseDate = purchaseDate;
        purchaseModel.items = itemArray;
        let totalAmount = 0;
        itemArray.map((item) => {
            console.log(typeof item.price, typeof item.quantity);
            let itemAmount = Number(item.price) * Number(item.quantity);
            totalAmount = totalAmount + itemAmount;
        });
        purchaseModel.totalAmount = totalAmount
        purchaseModel.save((err, done) => {
            if (err) {
                return reject(err)
            }
            if (done) {
                resolve(done)
            }
        })

    })
}

const AddItemSales = (salesArray, billno, salesDate) => {
    return new Promise((resolve, reject) => {
        let salesModel = new SalesModel({});
        salesModel.billno = billno;
        salesModel.items = salesArray;
        salesModel.salesDate = salesDate;
        let totalAmount = 0;
        salesArray.map((item) => {
            let itemAmount = Number(item.price) * Number(item.quantity)
            totalAmount = totalAmount + itemAmount;
        });
        salesModel.totalAmount = totalAmount;
        salesModel.save((err, done) => {
            if (err) {
                return reject("Not saved in sales depo")
            }
            if (done) {
                resolve(done)
            }
        })
    })
}

const AddItemStock = (arrayStock) => { //add stock of purchase in their stock
    return new Promise((resolve, reject) => {
        let recievedItem = [];
        arrayStock.map((item) => {
            FindItemStock({ itemName: item.itemName })
                .then((stockItem) => {
                    stockItem.totalStock = parseInt(stockItem.totalStock) + Number(item.quantity);
                    stockItem.price.push(item.price);
                    stockItem.quantity.push(item.quantity);
                    stockItem.save((err, done) => {
                        if (err) {
                            return reject("Not Saved")
                        }
                        if (done) {
                            recievedItem.push(stockItem);
                            if (recievedItem.length === arrayStock.length) {
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

const ReduceStockItem = (itemArray) => {
    return new Promise((resolve, reject) => {
        let SaleItems = [];
        itemArray.map((item) => {
            FindItemStock({ itemName: item.itemName }) // searching stock item
                .then((stockItem) => {
                    stockItem.totalStock = parseInt(stockItem.totalStock) - Number(item.quantity)
                    stockItem.salesPrice.push(item.price);
                    stockItem.salesQuantity.push(item.quantity);
                    stockItem.save((err, done) => {
                        if (err) {
                            return reject("Not sold")
                        }
                        if (done) {
                            SaleItems.push(stockItem);
                            if (SaleItems.length === itemArray.length) {
                                resolve(SaleItems)

                            }
                        }
                        else {
                            return reject("Not all items for sale were modified")
                        }
                    })
                })
        })
    })
}

const CheckItems = ()=>{
    return new Promise((resolve,reject)=>{
        ItemModel.find({},(err,done)=>{
            if(err){
                return reject(err)
            }
            if(done){
               let itemArray =  done.map((item)=>(
                    item.itemName.replace('-','')
                )) // returning itemName in array
                console.log(itemArray);
                resolve(itemArray);
            }
        })
    })
}

const AddNewItem = (itemName) => {
    return new Promise((resolve, reject) => {
        let newitemName = itemName.trim().replace(/ +/g, '-').toUpperCase();//removes all the spaces 
        ItemModel.findOne({ itemName: newitemName }, (err, item) => {
            if (err) {
                return reject(err)
            }
            if (item) {
                return reject("Item already exists in the system")
            }
            // if ( item && item.replace('-','').match(itemName.toUpperCase())) { //checking if words matches bcoz
            // // we have set name with '-' in between spaces so if user provides sona rice it becomes sona-rice;
            // //and when user types sonarice then due to lack of space it becomes sonarice (becomes new item);
            // //so to prevent that we are using this to match spell 
            //     return reject("Item already exists in the system 11")
            // }
            if (!item) {
                CheckItems()
                    .then((itemArray)=>{ //  contains itemArray
                        if(itemArray.includes(itemName.toUpperCase().trim().replace(/ +/g,''))){ // checking if the new item is already there
                            return reject("Item already exsits !!")
                        }
                        else{ //if not then adding to the DB 
                            let model = new ItemModel({});
                            model.itemName = newitemName;
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
                    .catch((err)=>{
                        return reject("Error occured during the inspection of item")
                    })
            }
        })
    })
}

module.exports = {
    AddNewItem,
    AddItemStock,
    FindItemStock,
    AddItemPurchase,
    AddItemSales,
    ReduceStockItem
}