const Lot = require('../models/Lots');
const Spot = require('../models/spots');
const request = require('request');

module.exports = {
    getAll : (req, res) => {
        let originLat = req.params.lat;
        let originLon = req.params.lon;
        console.log(originLat);
        console.log(originLon);
        Lot.find({}, (err, lots) => {
            if(err) {res.send(err)}
            let destination = '';
            lots.forEach((item, key) => {
                if(key<1) {
                    destination = destination + `${item.lat}%2C${item.lon}`
                }
                else{
                    destination = destination + `%7C${item.lat}%2C${item.lon}`
                }
            });
            request.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${originLat},${originLon}&destinations=${destination}&key=AIzaSyCqT5Ofdx1qAlishPBextMX-6lVcc1TsiM` ,(err, response, body) => {
                console.log(body);
                let distances = (JSON.parse(body).rows[0].elements);

                distances.forEach((item,key) => {
                    item.num = key;
                });

                distances.sort((a,b) => {
                    return a.distance.value > b.distance.value;
                });

                distances = distances.map(item => {
                    return item.num;
                });

                finalArray = [];
                distances.forEach(item => {
                    finalArray.push(lots[item])
                });

                res.send(finalArray);
            });

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