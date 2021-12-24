# Mongoose Auto-Increment

Mongoose plugin for auto-increment number ID and given field name.

## Install

```bash
npm install --save simple-mongoose-autoincrement
```
#####or
```bash
yarn add simple-mongoose-autoincrement
```

## Usage

```js
// Using with global.
var mongoose = require('mongoose');
var autoincrement = require('simple-mongoose-autoincrement');

mongoose.plugin(autoincrement, {/*no field name*/});
```
```js
// Using with a model and option.
var mongoose = require('mongoose');
var autoincrement = require('simple-mongoose-autoincrement');
var sampleSchema = mongoose.Schema({
  data: String
});
sampleSchema.plugin(autoincrement, {field: 'sequnece' /*with field name*/});
```

###If you need more informations see [test.js](https://github.com/moltak/mongoose-autoincrement/blob/master/test/test.js)

## License
MIT
