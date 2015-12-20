(function () {
  'use strict';

  angular.module('app', [
      // shared submodule
      'app.core',
      
      // featured submodule
      'app.layout',
      'app.home',
      'app.auth',
      'app.user',
    ]
  );


})();
