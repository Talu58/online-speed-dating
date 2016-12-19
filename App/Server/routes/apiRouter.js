var express = require('express')
var userHandler = require('../handlers/userHandler.js');
var eventHandler = require('../handlers/eventHandler.js');
var config  = require('../config');
var jwt = require('express-jwt');

var jwtAuth = jwt({
	secret: config.secret
});

var router = express.Router();

router.use(jwtAuth)

router.route('/user')
.get(userHandler.getUser)
.put(userHandler.updateUser);

router.route('/user/events')
.get(eventHandler.getSingleEvent)

router.route('/user/addEvent')
.put(userHandler.addEvent)

router.route('/user/unjoinEvent')
.put(userHandler.unjoinEvent)

router.route('/events')
.get(eventHandler.getEvents)
.post(eventHandler.postEvent)
.put(eventHandler.updateEvent);

router.route('/userBasic')
.put(userHandler.updateUser);

router.route('/userInterests')
.put(userHandler.updateInterests);

router.route('/userPersonal')
.put(userHandler.updatePersonal);


module.exports = router;




// var passport = require('passport');

