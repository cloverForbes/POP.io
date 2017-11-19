const Lot = require('../models/Lots');
const Spot = require('../models/spots');
const request = require('request');

module.exports = {
    getAll : (req, res) => {
        Lot.find({}, (err, lots) => {
            if(err) {res.send(err)}
            res.send(lots);
        })
    },

    newLot : (req, res) => {
        let lot = new Lot();
        let lat = req.params.lat;
        let lon = req.params.lon;
        let num = req.params.num;
        request.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`, (err,response,body)=> {
            body = JSON.parse(body);
            lot.address = body.results[0].formatted_address;
            lot.lat = lat;
            lot.lon = lon;
            lot.num = num;
            lot.size = req.params.size;

            lot.save((err, lot) => {
                if(err){res.send(err)}
                else{
                    for(let x = 1; x <= lot.size; x++){
                        let spot = new Spot();
                        spot.lot = lot.num;
                        spot.spot = x;
                        spot.save((err,res,body) => {
                        });
                    }
                }
            });
        });
    }
};