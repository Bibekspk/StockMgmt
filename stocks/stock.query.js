const ItemTypeModel = require('./itemType.model');


const FindItemType = (condition) => {
    return new Promise((resolve, reject) => {
        ItemTypeModel.findOne(condition, (err, done) => {
            if (err) {
                return reject("Item type error occured")
            }
            if (done) {// checking if itemType is already in the DB
                return reject("Item type is already in the system")
            }
            if (!done) { //if not in the system, then add to the db.
                let ItemsModel = new ItemTypeModel({});
                ItemsModel.itemType = condition.itemType
                ItemsModel.save((err, done) => {
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
    FindItemType
}