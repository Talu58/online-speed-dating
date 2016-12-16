var express = require('express')
var router = express.Router();
var userHandler = require('../handlers/userHandler.js');
var eventHandler = require('../handlers/eventHandler.js');


router.route('/user')
.get(userHandler.getUser)
.put(userHandler.updateUser);

router.route('/user/events')
.get(eventHandler.getSingleEvent);

router.route('/events')
.get(eventHandler.getEvents)
.post(eventHandler.postEvent)
.put(eventHandler.updateEvent);


module.exports = router; 







// var passport = require('passport');

