(function() {
  'use strict';

  angular
    .module('blocks.auth')
    .factory('authService', authServiceProvider);

  authServiceProvider.$inject = ['$http', '$cookies', '$rootScope', 'logger'];
  function authServiceProvider($http, $cookies, $rootScope, logger) {
    init();
    var service = {
      login : login,
      logout: logout,
      signup: signup,
      isAuthenticated: isAuthenticated,
      authChangeSuccess: authChangeSuccess
    };

    return service;
    ///////////////

    function init() {
      // set credential into $rootScope
      var isLogged = $cookies.get('logged_in');
      $rootScope.currentUser = {};
      if (isLogged && isLogged == 'yes') {
        $rootScope.currentUser._id = $cookies.get('user_id');
      }
      console.log($rootScope.currentUser);
    }

    function login(data, done) {
      $http({
        method: 'POST',
        url: '/api/login',
        data: data
      })
      .then(function successfult(res) {
        var user = res.data;
        logger.success('login successfully', user.username);
        setCredential(user);
        done(null, user);
      }, 
      function failure(res) {
        var err = res.data;
        logger.error('login failed: ' + err.msg);
        done(err);
      });
    }

    function signup(data, done) {
      $http({
        method: 'POST',
        url: '/api/signup',
        data: data
      })
      .then(function success(res) {
        var user = res.data;
        setCredential(user);
        logger.success('Sign up successfully', user.username);
        done(null, user);
      },
      function failure(res) {
        var err = res.data;
        logger.error('Sign up failed: ' + err.msg);
        done(err);
      });
    }

    function logout() {
      $http.get('/api/logout')
      .then(function success(res) {
          removeCredential();
          logger.success('Log out successfully');
        },
        function failure(res) {
          logger.error(res.data.msg);
        }
      );
    }

    function authChangeSuccess(done) {
      $rootScope.$on('authChangeSuccess', function(event, newStatus) {
        console.log(123);
        done(newStatus);
      });
    }

    function isAuthenticated() {
      return $rootScope.currentUser._id !== undefined;
    }

    // set cookies in browser and session
    function setCredential(user) {
      $cookies.put('logged_in', 'yes');
      $cookies.put('user_id', user._id);
      $rootScope.currentUser = user;
      $rootScope.$emit('authChangeSuccess', true);
      console.log($rootScope.currentUser);
    }

    // remove credential from browser
    function removeCredential(user) {
      $cookies.put('logged_in', 'no');
      $cookies.remove('user_id');
      $rootScope.currentUser = {};
      $rootScope.$emit('authChangeSuccess', false);
      console.log($rootScope.currentUser);
    }
  }
})();
