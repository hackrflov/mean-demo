(function() {
  'use strict';

  angular
    .module('app.home')
    .config(homeRouterConfig);

  homeRouterConfig.$inject = ['routerManagerProvider'];
  function homeRouterConfig(routerManagerProvider) {
    routerManagerProvider.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'home',
        config: {
          url: '/',
          templateUrl: 'home/home.html',
        }
      }
    ];
  }
})();
