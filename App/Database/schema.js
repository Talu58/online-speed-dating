var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: { unique: true } },
  password: {type: String, required: true},
  salt: String,
  userinfo: {type: String, default: 'User did not provide info'},
  name: {type: String, default: 'please fill out'},
  age: {type: Number, default: '0'},
  location: {type: String, default: 'please fill out'},
  profileImg: {type: String, default: 'https://www.svgimages.com/svg-image/s4/question-mark-face-256x256.png'},
  gender: {type: String, default: 'please fill out'},
  admin: {type: Boolean, default: false},
  events: {type: Array, default: []},
  callList: {type: Array, default: []},
  matches: {type: Array, default: []}
});

//TODO:
userSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, null, function(err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
})

userSchema.methods.checkPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){

    if (err) {
      return cb(err);
    }
    cb (null, isMatch)
  })
}

var eventSchema = mongoose.Schema({
  date: {type: Date, required: true },
  usernames: {type: Array, default: []},
  eventType: {type: String, default: 'please fill out'},
  eventName: {type: String, required: true, index: { unique: true }, default: 'please fill out'},
  eventCallDuration: {type: Number, default: 300000},
});


exports.userSchema = userSchema;
exports.eventSchema = eventSchema;