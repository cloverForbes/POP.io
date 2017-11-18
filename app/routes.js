const express    = require('express'),
      router     = express.Router(),
      controller = require('./controllers/controller');


module.exports = router;


router.get('/spots/all', controller.showAll);
router.post('/spots/new/:num', controller.newSpot);
router.put('/spots/:num', controller.flipSpot);
router.get('/spots/:num', controller.getSpot);