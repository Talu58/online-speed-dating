var mongoose = require('mongoose');

/////// Start of Encryption Middleware ///////
// var bcrypt = require('bcrypt-nodejs');
// var SALT_WORK_FACTOR = 10;
/////// End of Encryption Middleware ///////

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: { unique: true } },
  password: {type: String, required: true},
  salt: String,
  profileImg: {type: String, default: 'http://www.returnofkings.com/wp-content/uploads/2014/04/online-dating-header2.jpg'},
  name: {type: String, default: ''}, //rendered in vue
  age: {type: Number, required: true, default: '21'},
  gender: {type: String, default: ''},
  interestedIn: {type: String, default: ''},
  location: {type: String, required: true, default: '94105'},

  userinfo: {type: String, default: ''}, //rendered in vue
  firstname: {type: String, default: ''},
  lastname: {type: String, default: ''},
  phone: {type: Number, default: ''},
  email: {type: String, default: ''},

  admin: {type: Boolean, default: false},
  events: {type: Array, default: []},
  callList: {type: Array, default: []},
  matches: {type: Array, default: []},
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
  eventCallDuration: {type: Number, default: 300000},
});


exports.userSchema = userSchema;
exports.eventSchema = eventSchema;
exports.fbUserSchema = fbUserSchema;