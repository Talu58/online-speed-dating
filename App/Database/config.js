var mongoose = require('mongoose');

mongoURI = 'mongodb://heroku_8jlzsg4l:iqre1phj99adudrk9rltcabnr4@ds133378.mlab.com:33378/heroku_8jlzsg4l';
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