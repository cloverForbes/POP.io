const express    = require('express'),
      router     = express.Router(),
      controller = require('./controllers/controller'),
      lotCon     = require('./controllers/lots');


module.exports = router;


router.get('/spots/all/:lot', controller.showAll);
router.post('/spots/new/:lot/:num', controller.newSpot);
router.put('/spots/:lot/:num', controller.flipSpot);
router.get('/spots/:lot/:num', controller.getSpot);

router.get('/lots/all/:lat/:lon', lotCon.getAll);
router.post('/lots/:num/:size/:lat/:lon/', lotCon.newLot);