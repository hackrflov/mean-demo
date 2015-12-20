(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController);

  UserController.$inject = ['userService', 'logger'];
  function UserController(userService, logger) {
    var vm = this;
    vm.title = 'User Profile';
    userService.profile(function done(err, username) {
      if (err) return logger.error(err);
      logger.success('get profile!');
      vm.username = username;
    });
  }
})();
