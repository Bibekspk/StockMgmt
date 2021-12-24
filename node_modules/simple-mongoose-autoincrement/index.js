'use strict';
const rx = require('rx');

var autoIncrement = function (schema, options) {
  var field = {
    _id: { type: Number, index: true, unique: true },
    createAt:{ type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  };

  // swith to options field
  var fieldName = getField(options);
  if(fieldName !== '_id') {
    field[getField(options)] = {type: Number, index: true, unique: true};
    delete field._id;
  }

  schema.add(field);
  schema.pre('save', function (next) {
    var doc = this;
    doc.updateAt = Date.now();

    if (doc.db && doc.isNew && typeof doc[fieldName] === 'undefined') {
      getNextSeqObservable(doc.db.db, doc.collection.name)
        .retryWhen(err => {
          return err;
        })
        .subscribe(seq => {
          doc[fieldName] = seq;
          next();
        });
    } else {
      next();
    }
  });
};

var getField = function (options) {
  if(options && options.field) return options.field;
  else return '_id';
}

var getNextSeqObservable = function (db, name) {
  return rx.Observable.create(o => {
    db.collection('counters').findOneAndUpdate(
      { _id: name },
      { $inc: { seq: 1 } },
      { returnOriginal: false, upsert: true },
      function (err, ret) {
        if (err) {
          return o.onError(err);
        } else {
          o.onNext(ret.value.seq);
          return o.completed();
        }
      });
  });
};

module.exports = autoIncrement;
