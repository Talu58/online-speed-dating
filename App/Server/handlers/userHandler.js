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
    if (err) { console.error(err); }
    if (!user) {
      exports.createUserDB({username: username, password: password}, function(err, user) {
        res.send('user created');
      });
    } else {
      res.status(401).send('Username already exists');
    }
  });
};

exports.getUser = function (req, res) {
  exports.getUserDB(req.query.username, function(err, user) {
    if (err) { console.error(err); }
    res.status(200).send(user);
  });
};


exports.updateUser = function (req, res) {
  console.log('req.bdoy', req.body)
  User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
    res.send(204);
  });
};

// exports.updateUser = function (req, res) {
//   console.log('req.bdoy', req.body)
//   User.findOneAndUpdate({username: req.body.username}, {$set: req.body}, function() {
//     res.send(204);
//   });
// };
//new code//

//updted $set content;
// exports.updateUser = function (req, res) {
//   var userProp=req.body.userProp
//   console.log('req looks like?', req.body)

//   console.log('req.body.username', req.body.username)
//   console.log('req.body.userProp', userProp)

//   User.findOneAndUpdate({username: req.body.username}, {$set: req.body.userProp.userProp, function() {
//     res.send(204);
//   }
// })
// }


