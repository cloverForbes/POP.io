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
      res.send(req.params);
  },

  flipSpot : (req, res) => {
    let spot = req.params.num;
    //res.send(spot);
    Spot.findOne({spot: spot}, (err, spot) => {
        Spot.findOneAndUpdate({_id: spot.id},{taken: !spot.taken}, {upsert: true, 'new': true}, (err,spotUpdate) => {
            res.send(spotUpdate);
        })
      })
  },

  newSpot : (req,res) => {
      let spot = new Spot();
      spot.spot = req.params.num;
      spot.save((err,spot) => {
          if(err){res.send(err)}
          res.send(spot);
      })
  }

};