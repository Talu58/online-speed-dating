var router = require('express').Router();
var userHandler = require('../handlers/userHandler.js');
var jwt = require('jsonwebtoken');

router.post('/login', userHandler.loginUser);
router.post('/signup', userHandler.signUpUser);
// router.get('/logout', userHandler.logoutUser);


module.exports = router; 




// var passport = require('passport');
// var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
// router.post('/authorize', ensureLoggedIn({ redirectTo: '/login', setReturnTo: false }), function(req, res) {
//   console.log('user was authorized', req.user);
//   res.send(req.user);
// });



