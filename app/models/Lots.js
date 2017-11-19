'use strict';

const mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

const lotSchema = new Schema({
    lat: String,
    lon: String,
    size: Number,
    address: String,
    num : String,
});

module.exports = mongoose.model('Lots', lotSchema);