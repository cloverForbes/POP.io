const Spot = require('../models/spots');

module.exports = {
  showAll : (req, res) => {
      Spot.find({}, (err, spots) => {
          if(err){
              res.send(err);
          }
          res.send(spots);
      })
  },

  getSpot : (req,res) => {
      let spot = req.params.num;
      let lot  = req.params.lot;
      Spot.findOne({spot: spot, lot:lot}, (err, spot) => {
          if(err){res.send(err);}
          res.send(spot);
      })
  },

  flipSpot : (req, res) => {
    let spot = req.params.num;
    let lot  = req.params.lot;
    Spot.findOne({spot: spot, lot: lot}, (err, spot) => {
        Spot.findOneAndUpdate({_id: spot.id},{taken: !spot.taken}, {upsert: true, 'new': true}, (err,spotUpdate) => {
            res.send(spotUpdate);
        })
      })
  },

  newSpot : (req,res) => {
      let spot = new Spot();
      spot.spot = req.params.num;
      spot.lot  = req.params.lot;
      spot.save((err,spot) => {
          if(err){res.send(err)}
          res.send(spot);
      })
  }

};