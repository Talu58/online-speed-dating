var router = require('express').Router();
var userHandler = require('../handlers/userHandler.js');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

router.post('/login', function(req, res) {
	console.log('REQ.USER ON LOGIN', req.user)
  res.status(200).json(req.user);
});


router.post('/signup', userHandler.signUpUser);


router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send('logged out');
});
// router.post('/authorize', ensureLoggedIn({ redirectTo: '/login', setReturnTo: false }), function(req, res) {
//   console.log('user was authorized', req.user);
//   res.send(req.user);
// });



module.exports = router;