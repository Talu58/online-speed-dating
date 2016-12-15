var router = require('express').Router();
var userHandler = require('../handlers/userHandler.js');
var eventHandler = require('../handlers/eventHandler.js');

router.post('/user', userHandler.signUpUser);
router.get('/user', userHandler.getUser);
router.put('/userBasic', userHandler.updateUser);
router.put('/userInterests', userHandler.updateInterests);

router.get('/events', eventHandler.getEvents);
router.post('/events', eventHandler.postEvent);
router.put('/events', eventHandler.updateEvent);

router.get('/user/events', eventHandler.getSingleEvent);

module.exports = router;