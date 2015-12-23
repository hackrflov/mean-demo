(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['$scope', 'userService', 'authService', 'routerManager'];
  function ShellController($scope, userService, authService, routerManager) {
    var vm = this;
    vm.showTopnav = routerManager.currentState().name !== 'auth';
    $scope.$on('$stateChangeSuccess', function(e, toState) {
      vm.showTopnav = toState.name === 'auth' ? false : true;
    });
    if (authService.isAuthenticated()) {
      vm.isLogged = true;
      userService.profile(function(done, user){
        vm.thumbnail = user.thumbnail;
      });
    } else {
      vm.isLogged = false;
    }
    // bind
    authService.authChangeSuccess(function(status) {
      vm.isLogged = status;
    });

    vm.logout = function() {
      authService.logout();
    };
  }
})();
