(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('topnav', topnav);

  topnav.$inject = ['authService'];
  function topnav(authService) {
    return {
      link: link
    };

    function link(scope) {
      // declare
      scope.isLogged = authService.isAuthenticated();

      // bind
      authService.authChangeSuccess(function(status) {
        scope.isLogged = status;
      });

      scope.logout = function() {
        authService.logout();
      };
    }
  }

  shellPanel.$inject = ['$state'];
  function shellPanel($state) {
    return {
      link : link
    };

    function link(scope) {
      // declare
      // TODO: statechangestatr event listener
      console.log($state);
      scope.showTopnav = $state.current.name !== 'auth';
      console.log(scope.showTopnav);
    }
  }
})();
