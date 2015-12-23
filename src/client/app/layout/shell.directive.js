(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('shell', shell);

  shell.$inject = ['$state'];
  function shell($state) {
    return {
      controller: 'ShellController as shellVm',
      link : link
    };

    function link(scope) {
      // declare
      // TODO: statechangestatr event listener
    }
  }
})();
