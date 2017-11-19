'use strict';

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const spotSchema = new Schema({
    spot  :  String,
    taken :  {
        type   : Boolean,
        default: false
    },
    lot   : String
});

module.exports = mongoose.model('Spots', spotSchema);