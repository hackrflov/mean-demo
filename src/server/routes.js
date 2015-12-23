/*jshint node:true*/
'use strict';

var path = require('path');
var User = require('./models/user.js');

module.exports = function (app, passport) {

  app.post('/api/login', function(req, res) {
    passport.authenticate('local', function(err, user, msg) {
      if (err) return res.status(400).json(err);
      if (!user) return res.status(401).json({ msg: msg});
      req.logIn(user, function(err) {
        if (err) return res.status(402).json(err);
        return res.status(200).json(user);
      });
    })(req, res);
  });

  app.post('/api/signup', function(req, res) {
    User.signup(req.body, function(err, user, msg) {
      if (err) return res.status(400).json(err);

      // username already taken
      if (!user) return res.status(401).json({ msg : msg });
      req.login(user, function(err) {
        if (err) return res.status(400).json(err);
        return res.status(200).json(user);
      });
    });
  });

  app.get('/api/logout', function(req, res) {
    req.logout();
    res.status(200).end();
  });

  app.get('/api/profile', function(req, res) {
    console.log(req.user);
    User.profile(req.user, function(err, user, msg) {
      res.json(user);
    });
  });

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  app.get('/', function(req, res) {
    res.setStatus(404).end();
  });
};

