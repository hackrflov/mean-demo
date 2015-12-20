/* jshint node: true */
'use strict';

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

// sign up
userSchema.statics.signup = function(data, done) {
  var User = this;
  var username = data.username;
  var password = data.password;
  User.findOne({ username: username }, function(err, user) {
    if (err) return done(err);
    
    // if username is already taken
    if (user) {
      return done(null, null, 'Username is already taken.');
    }

    // create an account
    var newUser = new User();
    newUser.username = username;
    newUser.password = newUser.generateHash(password);

    newUser.save(function(err) {
      if (err) return done(err);
      return done(null, newUser);
    });
  });
};

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
