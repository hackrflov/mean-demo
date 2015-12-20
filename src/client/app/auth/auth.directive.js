(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('authPanel', authPanel);

  authPanel.$inject = ['authService', 'routerManager'];
  function authPanel(authService, routerManager) {
    return {
      link: link
    };

    function link(scope, element, attrs) {
      // declare a model
      scope.user = {};
      scope.active = {};

      // preload params
      var hash = routerManager.hash();
      var type = hash ? hash : 'login';
      scope.active[type] = true;

      // view-model methods
      scope.select = function(type) {
        for (var val in scope.active) {
          scope.active[val] = false;
        }
        scope.active[type] = true;
        routerManager.hash(type);
      };

      scope.login = function() {
        authService.login(scope.user, function done(err, data) {
          if (err) return;
          routerManager.goBackState();
        });
      };

      scope.signup = function() {
        authService.signup(scope.user, function done(err, data) {
          if (err) return;
          routerManager.goBackState();
        });
      };
    }
  }
})();
