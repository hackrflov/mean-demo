(function () {
  'use strict';

  angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngAnimate', 
    /*
     * Our reusable cross app code modules
     */
    // TODO: add blocks.excetion 
    'blocks.logger', 'blocks.router', 'blocks.auth', 'blocks.user'
  ]);
})();
