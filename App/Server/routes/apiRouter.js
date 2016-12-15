var router = require('express').Router();
var userHandler = require('../handlers/userHandler.js');
var eventHandler = require('../handlers/eventHandler.js');
var passport = require('passport');

router.get('/user', userHandler.getUser);

router.put('/user', userHandler.updateUser);
router.get('/user/events', eventHandler.getSingleEvent);

router.get('/events', eventHandler.getEvents);
router.post('/events', eventHandler.postEvent);
router.put('/events', eventHandler.updateEvent);


module.exports = router;