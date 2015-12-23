(function() {
  'use strict';

  angular
    .module('blocks.user')
    .factory('userService', userService);

  userService.$inject = ['$http'];
  function userService($http) {
    var service = {
      profile: profile
    };

    return service;
    //////////////

    function profile(done) {
      $http({
        url: '/api/profile',
        method: 'GET'
      }).then(function success(res) {
        done(null, res.data);
      }, function failure(res) {
        done(res.data);
      });
    }
  }
})();
