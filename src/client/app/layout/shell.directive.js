(function() {
  'use strict';

  angular
    .module('app.layout')
    .directive('shell', shell);

  shell.$inject = ['$state'];
  function shell($state) {
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
