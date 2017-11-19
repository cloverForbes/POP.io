const express    = require('express'),
      router     = express.Router(),
      controller = require('./controllers/controller'),
      lotCon     = require('./controllers/lots');


module.exports = router;


router.get('/spots/all', controller.showAll);
router.post('/spots/new/:num', controller.newSpot);
router.put('/spots/:num', controller.flipSpot);
router.get('/spots/:num', controller.getSpot);

router.get('/lots/all', lotCon.getAll);
router.post('/lots/:size/:lat/:lon/', lotCon.newLot);