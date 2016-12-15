var mongoose = require('mongoose');

mongoURI = 'mongodb://elliott:e@ds129028.mlab.com:29028/heroku_wsps6bz3';
mongoose.connect(mongoURI);

var db = mongoose.connection; 

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongodb connection open');
  // db.dropDatabase(function(err) {
  // 	if(err) {
  // 		console.log('Error Dropping DB');
  // 	}
  // 	console.log('DB Dropped')
  // });
}); 

module.exports = db;