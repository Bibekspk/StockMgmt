const ItemTypeModel=require('./itemType.model');
const ItemModel = require('./item.model')
const StockQuery = require('./stock.query');

const AddStock = (req,res,next)=>{
    let arrayStock = req.body;
    console.log(req.body);
    arrayStock.map((item)=>{
        StockQuery.FindItemStock({itemName: item.itemName})
            .then((stockItem)=>{
                stockItem.totalStock = parseInt(stockItem.totalStock) + Number(item.quantity);
                stockItem.price.push(item.price);
                stockItem.quantity.push(item.quantity);
                stockItem.save((err,done)=>{
                    console.log("inside save");
                    if(err){
                        return next({
                            msg:"not saved",
                            status: 400
                        })
                    }
                    else{
                        res.json({
                            data: done,
                            status:200
                        })
                    }
                })
            })
            .catch((err)=>{
                return next({
                    msg:err,
                    status: 400
                })
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
    StockQuery.AddItem(condition)
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