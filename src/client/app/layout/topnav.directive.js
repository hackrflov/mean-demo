(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('topnav', topnav);

  topnav.$inject = ['authService'];
  function topnav(authService) {
    return {
      replace: true,
      controller: 'ShellController as shellVm',
      link: link
    };

    function link(scope) {
    }
  }
})();
