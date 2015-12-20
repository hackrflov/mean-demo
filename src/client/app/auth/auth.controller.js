(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['authService', 'routerManager'];
  function AuthController(authService, routerManager) {
    console.log('auth controller init');
    var vm = this;
    /////////////////

    function loginLocal() {
      var username = vm.username;
      var password = vm.password;
      var data = { username:username, password:password };
      authService.login(data, function done(err, data) {
        if (err) return;
        routerManager.goBackState();
      });
    }

    function signup() {
      var username = vm.username;
      var password = vm.password;
      var data = { username:username, password:password };
      authService.signup(data, function done(err, data) {
        if (err) return;
        routerManager.goBackState();
      });
    }
  }
})();
