var userModel = require('../../Database/models/userModel.js');
var db = require('../../Database/config.js');
var User = require('../../Database/models/userModel.js');

exports.getUserDB = function(username, cb) {
  User.findOne({ username: username})
   .exec(function(err, user) {
     if (err) { cb(err); }
     cb(null, user);
   });
};

exports.createUserDB = function(user, cb) {
  User.create(user, function (err, user) {
    if (err) { return cb(err); }
    console.log('password after', user.password, user.salt)

    cb(null, user);
  });
};

exports.signUpUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var salt =

  console.log('password before', password);

  exports.getUserDB(username, function(err, user) {
    if (err) { res.status(400).send('getUserDB Bad Request'); }
    if (!user) {
      exports.createUserDB({username: username, password: password}, function(err, user) {
        res.json(user);
      });
    } else {
      res.status(401).send('Username already exists');
    }
  });
};

exports.getUser = function (req, res) {
  exports.getUserDB(req.query.username, function(err, user) {
    if (err) { return res.status(400).send('GET USER Bad Request')}
    res.status(200).send(user);
  });
};

//// new code ////

exports.updateUser = function (req, res) {
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
    res.send(204);
  });
};

exports.updateInterests = function (req, res) {
  console.log('req.bdoy', req.body)
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
    res.send(204);
  });
};

exports.updatePersonal = function (req, res) {
  console.log('req.bdoy', req.body)
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
    res.send(204);
  });
};




