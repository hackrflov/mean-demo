/* jshint node: true */
'use strict';

var User = require('../models/user.js');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

  // session setup ===================================
  
  // put data upon session
  passport.serializeUser(function(user, done) {
    var sessionUser = { _id: user._id, username: user.username };
    done(null, sessionUser);
  });

  // get data from session
  passport.deserializeUser(function(sessionUser, done) {
    // the sessionUser object come from 
    // req.session.passport.user
    done(null, sessionUser);
  });

  // authenticate ===================================

  passport.use(new LocalStrategy(
    function(username, password, done) {
      // callback: done(err, user, msg) {...}
      // ensure asynchronous
      process.nextTick(function() {
        User.findOne({ username: username }, function(err, user) {
          if (err) return done(err);
          if (!user) {
            return done(null, false, 'Incorrect username' );
          }
          if (!user.validPassword(password)) {
            return done(null, false, 'Incorrect password.');
          }
          return done(null, user);
        });
      });
    }
  ));
};
