const ItemTypeModel=require('./itemType.model');
const ItemModel = require('./item.model')
const StockQuery = require('./stock.query');

const AddStock = (req,res,next)=>{
    let arrayStock = req.body.purchaseArray;
    let billno = req.body.billno
    let purchaseDate = req.body.purchaseDate;
    console.log(billno,purchaseDate);
    StockQuery.AddItemPurchase(arrayStock)
        .then((response)=>{
            res.json({
                data: response,
                status: 200
            })
        })
        .catch((err)=>{
            return next({
                msg: err,
                status: 400
            })
        })
   
}

const AddItemType=(req,res,next)=>{
    let condition={};
    condition.itemType = req.body.itemType.toUpperCase().replaceAll(' ','');
    StockQuery.FindItemType(condition)
        .then((data)=>{
            res.json({
                msg: "ItemType Added Successfully",
                data,
                status:200
            })
        })
        .catch((err)=>{
            console.log(err);
            return next({
                msg : err,
                status: 400
            })
        })
}

const AddItem= (req,res,next)=>{
    let condition = {};
    condition.itemName = req.body.ItemName.replace(/ +/g, '-').toUpperCase(); //removes all the spaces 
    StockQuery.AddNewItem(condition)
        .then((resolve)=>{
            res.json({
                msg: "Successfully Added",
                status: 200
            })
        })
        .catch((err)=>{
            return next({
                msg: err,
                status: 400
            })
        })

}

const GetItemType=(req,res,next)=>{
    ItemTypeModel.find({},(err,done)=>{
        if(err){
            return next({
                msg: err,
                status:400
            })
        }
        if(done && !done.length){
            return next({
                msg: "Items not found"
            })
        }
        if(done){
            res.json({
                msg:"Successful",
                data: done,
                status:400
            })
        }
    })
}

const GetItems = (req,res,next)=>{
    ItemModel.find({},(err,done)=>{
        if(err){
            return next({
                msg: err,
                status: 400
            })
        }
        if(done){
            res.json({
                msg: "Successful",
                data: done,
                status: 200
            })
        }
    })
}

module.exports ={
    AddStock,
    AddItemType,
    GetItemType,
    AddItem,
    GetItems
}