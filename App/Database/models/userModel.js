var mongoose = require('mongoose');
var schema = require('../schema.js');

var User = mongoose.model('User', schema.userSchema);

// console.log('USER', schema.userSchema)

module.exports = User;