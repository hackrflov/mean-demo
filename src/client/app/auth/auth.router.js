(function () {
  'use strict';

  angular
    .module('app.auth')
    .config(authRouterConfig);
    
  authRouterConfig.$inject = ['routerManagerProvider'];
  function authRouterConfig(routerManagerProvider) {
    routerManagerProvider.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'auth',
        config: {
          url: '/auth',
          templateUrl: 'auth/auth.html'
        }
      }
    ];
  }
})();
