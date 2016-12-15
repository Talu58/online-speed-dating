var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var facebookStrategy = require('passport-facebook').Strategy;



var userHandler = require('./handlers/userHandler.js');
var User = require('../Database/models/userModel.js');
//////// new encryption schema starts here ////////
var FbUser = require('../Database/models/fbUserModel.js');
//////// new encryption schema ends here ////////

var sessionOptions = {
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false
};

module.exports = function(app, express) {
  app.use('/', express.static(path.join(__dirname, '../Client')));
  // app.use('/dist', express.static(path.join(__dirname, '../../compiled/transpiled')));
  app.get('/dist/main.js', function(req, res) {
    console.log('called');
    res.sendFile(path.join(__dirname, '../../compiled/transpiled/main.js'));
  });
  app.use(morgan('dev'));
  app.use(bodyParser.json());

//////// new encryption middleware starts here ////////
  // app.use(express.cookieParser());
//////// new encryption middleware ends here ////////
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

//////// new encryption codes start here ////////

  passport.use(new LocalStrategy(
    function(username, password, done) {

      userHandler.getUserDB(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          console.log('failed username');
          return done(null, false, { message: 'Incorrect username.' });
        }

        // hash (password, user.salt, function(err, hash){
        //   if (err) { return done(err);}
        //   if (hash == user.hash) return done(null, user);
        //   console.log('success');

        //   done(null, false, {message: 'Incorrect password.'});
        // });


////TODO: facebook login


//////// new encryption codes end here ////////

        if (password !== user.password) {
          console.log('failed password');
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);

      });
    }
  ));
};

