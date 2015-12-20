/*jshint node:true*/
'use strict';

module.exports = function UserController() {

  var service = {
    login: login,
    signup: signup,
    profile: profile
  };

  return service;
  /////////////////

  /**
   * User Log In
   * method: POST
   * data: { username, password }
   * returns: { password }
   */
  function login(req, res, next) {
  }

  /**
   * User Sign Up
   * method: POST
   * data: { username, password }
   * returns: { password }
   */
  function signup(req, res, next) {
  }

  /**
   * Show Profile
   * method: GET
   * params: { userId }
   * returns: { user }
   */
  function profile(req, res, next) {
  }
};

