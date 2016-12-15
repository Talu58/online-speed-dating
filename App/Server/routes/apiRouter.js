var router = require('express').Router();
var jwt = require('express-jwt');
var userHandler = require('../handlers/userHandler.js');
var eventHandler = require('../handlers/eventHandler.js');

let key = require('../config.js')
let jwtAuth = jwt({secret: key.secret});

router.get('/user', jwtAuth, userHandler.getUser);
router.put('/user',jwtAuth, userHandler.updateUser);
router.get('/user/events', jwtAuth, eventHandler.getSingleEvent);

router.get('/events', jwtAuth, eventHandler.getEvents);
router.post('/events', jwtAuth, eventHandler.postEvent);
router.put('/events',jwtAuth, eventHandler.updateEvent);

module.exports = router;

