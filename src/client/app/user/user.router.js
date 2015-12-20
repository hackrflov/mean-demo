(function() {
  'use strict';

  angular
    .module('app.user')
    .config(userRouterConfig);

  userRouterConfig.$inject = ['routerManagerProvider'];
  function userRouterConfig(routerManagerProvider) {
    routerManagerProvider.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'user/profile.html',
          controller: 'UserController as userVm',
          authenticate: true 
        }
      }
    ];
  }
})();
