var express = require('express');
var mongoose = require('mongoose');
var apiRouter = require('./routes/apiRouter.js');
var authRouter = require('./routes/authRouter.js');
var eventRouter = require('./routes/eventRouter.js');
var middleware = require('./middleware.js');
var User = require('../Database/models/userModel.js');


var app = express();
var PORT = process.env.PORT || 4321;



require('./middleware.js')(app, express);
app.use('/auth', authRouter);
app.use('/api', apiRouter);
app.use('/event', eventRouter);

app.get('/apix/users', function(req, res) {
  User.find({}, function(err, users) {
    var allUsers = {};
    users.forEach(function(user) {
      allUsers[user._id] = user;
    });
    res.json(allUsers);
  });
});


app.listen(PORT, function() {
  console.log('Express listening on port', PORT); 
});


module.exports = app;