'use strict';

const mongoose = require('mongoose'),
      Schema   = mongoose.Schema;

const spotSchema = new Schema({
    spot  :  String,
    taken :  Boolean
});

module.exports = mongoose.model('Spots', spotSchema);