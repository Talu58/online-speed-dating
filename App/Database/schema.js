var mongoose = require('mongoose');
/////// Start of Encryption Middleware ///////

// var bcrypt = require('bcrypt-nodejs');
// var SALT_WORK_FACTOR = 10;

/////// End of Encryption Middleware ///////

// var userSchema = mongoose.Schema({
//   username: {type: String, required: true, index: { unique: true } },
//   password: String,
//   userinfo: {type: String, default: 'User did not provide info'},
//   name: {type: String, default: 'please fill out'},
//   age: {type: Number, default: '0'},
//   location: {type: String, default: 'please fill out'},
//   profileImg: {type: String, default: 'https://www.svgimages.com/svg-image/s4/question-mark-face-256x256.png'},
//   gender: {type: String, default: 'please fill out'},
//   admin: {type: Boolean, default: false},
//   events: {type: Array, default: []},
//   callList: {type: Array, default: []},
//   matches: {type: Array, default: []}
// });


/////// Start of Encryption ///////

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: { unique: true } },
  password: {type: String, required: true},
  // salt: String,
  profileImg: {type: String, default: 'http://www.returnofkings.com/wp-content/uploads/2014/04/online-dating-header2.jpg'},
  name: {type: String, default: ''},
  age: {type: Number, default: '21'},
  gender: {type: String, default: ''},
  interestedIn: {type: String, default: ''},
  location: {type: String, default: '94105'},
  userinfo: {type: String, default: ''},
  admin: {type: Boolean, default: false},
  events: {type: Array, default: []},
  callList: {type: Array, default: []},
  matches: {type: Array, default: []}
});

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

//   if (!user.isModified('password')) {
//     return next();
//   }

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
  eventCallDuration: {type: Number, default: 300000},
});


exports.userSchema = userSchema;
exports.eventSchema = eventSchema;