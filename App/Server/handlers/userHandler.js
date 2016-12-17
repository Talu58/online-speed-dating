var userModel = require('../../Database/models/userModel.js');
var db = require('../../Database/config.js');
var User = require('../../Database/models/userModel.js');
var config = require('../config.json')
var jwt = require('jsonwebtoken');
var _ = require('underscore');

// HELPER DB FUNCTIONS
exports.getUserDB = function (username) {
  User.findOne({username: username})
   .exec(function(err, user) {
     if (err) { cb(err, null); }
     cb(null, user);
   });
};

exports.createUserDB = function(user, cb) {
  User.create(user, function (err, user) {
    if (err) { return cb(err, user); }
    console.log('password after', user.password, user.salt)

    cb(null, user);
  });
};

 // REQUEST HANDLER FUNCTIONS
exports.signUpUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var age = req.body.age;
  var gender = req.body.gender;
  var location = req.body.location;
  var interestedIn = req.body.interestedIn;
  console.log('REQ.BODY', req.body)
  User.findOne({username: username}).exec(function(err, user) {
    console.log('user', user)
    if (err) { return res.status(400).send('getUserDB ERR'); }
    if (!user) {
      var newUser =  new User ({
        username: username,
        password: password,
        age: age,
        gender: gender,
        location: location,
        interestedIn: interestedIn
      })

      newUser.save(function(err, user) {
        if (err) { return res.status(400).send('getUserDB Bad Request');}
        console.log("SIGNUP SUCCESFUL - USER DATA: ", newUser);
        console.log("USER.username", newUser.username)
        res.status(201).send({
          id_token: jwt.sign(newUser.username, config.secret),
          data: newUser
        });
      });
    } else {
      res.status(401).send('Username already exists');
    }
  });
};

//TODO: need to add bcrypt auth and replace code below
// if(password === user.password) {
//   console.log('MATCH', user)
exports.loginUser = function(req, res) {
  console.log('LOGIN - USER DATA', req.body, req.url)
  console.log('req.path',  req.path)
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}).exec(function(err, user) {
    console.log("user", user)
    if (err) { return res.status(400).send('getUserDB Bad Request'); }
    if (!user) { return res.sendStatus(401); }
            console.log("USER.username", user)
    res.status(201).send({
      id_token: jwt.sign(user.username, config.secret),
      data: user
    });
  })

};


exports.updateUser = function (req, res) {

  console.log('this is req.body for update user basic', req.body)
  User.findOneAndUpdate(
    {username: req.body.username},
    {$set: req.body }, function() {
    res.send(204);
  });
};

exports.updateInterests = function (req, res) {
  console.log('req.bdoy for updateInterest', req.body)
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body }, function() {
    res.send(204);
  });
};

exports.updatePersonal = function (req, res) {
  console.log('req.bdoy for update personal: ', req.body)
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
    res.send(204);
  });
};

exports.addEvent = function(req, res) {
  User.findOne({username: req.body.username}).exec(function(err,user) {
    if(err) return res.status(400).send('Err! update event');
    user.events.push(req.body.event);
    user.save(function(err, user) {
      if(err) { return res.status(400).send('Err! save event') }
        console.log('saved event succesfully', user)
        res.send(204);
    })
  })
};

exports.unjoinEvent = function(req, res) {
  console.log('rec\'d put request from front-end ', req.body )
  User.findOne({username: req.body.username}).exec(function(err,user) {
    if(err) return res.status(400).send('Err occured when deleting event(s)!');

    for (var i = 0; i < user.events.length; i++) {
      if (user.events[i]._id===req.body.event._id) {
        user.events.splice(i, 1);
      }
    }
    user.save(function(err, user) {
      if(err) { return res.status(400).send('Err! save event') }
        res.send(204);
    })
  })
};


exports.getUserEvents = function(req, res) {
  User.findOne({username: req.body.username}).exec(function(err,user) {
    if(err) return res.status(400).send('Err! update event');
      res.status(200).json(user.events);
    })
  }


// I'm not sure if this function is ever being used...
exports.getUser = function (req, res) {
  exports.getUserDB(req.query.username, function(err, user) {
    if (err) { return res.status(400).send('GET USER Bad Request')}
    res.status(200).send(user);
  });
};
