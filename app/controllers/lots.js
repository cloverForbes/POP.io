const Lot = require('../models/Lots');
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
        request.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}`, (err,response,body)=> {
            body = JSON.parse(body);
            lot.address = body.results[0].formatted_address;
            lot.lat = lat;
            lot.lon = lon;
            lot.size = req.params.size;

            lot.save((err, lot) => {
                if(err){res.send(err)}
                res.send(lot);
            });
        });
    }
};