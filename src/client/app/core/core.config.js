(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[<%= appName %> Error] ', // configure the exceptionHandler decorator
    appTitle: 'Mean Demo',
    version: '1.0.0'
  };

  core.value('config', config);

  // TODO: add blocks

  core.config(configure);

  configure.$inject = ['routerManagerProvider'];

  function configure(routerManagerProvider) {
    routerManagerProvider.configure({ docTitle: config.appTitle + ': '});
  }

})();
