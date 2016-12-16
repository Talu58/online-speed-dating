var mongoose = require('mongoose');

/////// Start of Encryption Middleware ///////
// var bcrypt = require('bcrypt-nodejs');
// var SALT_WORK_FACTOR = 10;
/////// End of Encryption Middleware ///////

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: { unique: true } },
  password: String,
  userinfo: {type: String },
  name: {type: String },
  age: {type: Number },
  location: {type: String},
  profileImg: {type: String, default: 'https://www.svgimages.com/svg-image/s4/question-mark-face-256x256.png'},
  gender: {type: String},
  admin: {type: Boolean, default: false},
  events: {type: Array },
  callList: {type: Array },
  matches: {type: Array }
});

/////// Start of FB authentication ///////

var fbUserSchema = mongoose.Schema({
  fbID: String,
  email: {type: String, lowercase: true},
  name: String
})

/////// Start of Encryption ///////

// userSchema.methods.checkPassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){

//     if (err) {
//       return cb(err);
//     }
//     cb (null, isMatch)
//   })
// };

// userSchema.pre('save', function(next){
//   var user = this;

  // if (!user.isModified('password')) {
  //   return next();
  // }

//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, null, function(err, hash){
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       user.salt = salt;
//       console.log('user.password',user.password);
//       console.log('user.salt',user.salt);
//       next();
//     });
//   });
// })

/////// End of Encryption ///////


var eventSchema = mongoose.Schema({
  date: {type: Date, required: true },
  usernames: {type: Array, default: []},
  eventType: {type: String, default: ''},
  eventName: {type: String, required: true, index: { unique: true }, default: ''},
  eventCallDuration: {type: Number, default: 300000}
});


exports.userSchema = userSchema;
exports.eventSchema = eventSchema;
exports.fbUserSchema = fbUserSchema;