(function() {
  'use strict';

  angular
    .module('app.user')
    .controller('UserController', UserController);

  UserController.$inject = ['userService', 'logger'];
  function UserController(userService, logger) {
    var vm = this;
    vm.title = 'User Profile';
    userService.profile(function done(err, user) {
      if (err) return logger.error(err);
      if (!user) return logger.error('profile err');
      vm.user = user;
      logger.success('get profile!');
    });
  }
})();
