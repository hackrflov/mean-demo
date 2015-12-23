(function () {
  'use strict';

  angular
    .module('blocks.router')
    .provider('routerManager', routerManagerProvider)
    
    // need run to kickstart routing
    .run(['routerManager', function(routerManager) {}]);

  routerManagerProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];
  function routerManagerProvider($locationProvider, $stateProvider, $urlRouterProvider) {
    /* jshint validthis:true */
    var config = {
      docTitle: undefined,
      resolveAlways: {}
    };

    $locationProvider.html5Mode(true);

    this.configure = function (cfg) {
      angular.extend(config, cfg);
    };

    // static configuration, used in config phase
    this.configureStates = configureStates;
    function configureStates(states, otherwisePath) {
      states.forEach(function(state) {
        state.config.resolve = 
          angular.extend(state.config.resolve || {}, config.resolveAlways);
        $stateProvider.state(state.state, state.config);
      });
      if (otherwisePath && !hasOtherwise) {
        hasOtherwise = true;
        $urlRouterProvider.otherwise(otherwisePath);
      }
    }

    this.$get = routerManager;
    routerManager.$inject = ['$location', '$rootScope', '$state', 'logger', 'authService'];
    function routerManager($location, $rootScope, $state, logger, authService) {
      var handlingStateChangeError = false;
      var hasOtherwise = false;
      var stateCounts = {
        errors: 0,
        changes: 0
      };

      var service = {
        hash: hash,
        currentState: currentState,
        stateData: stateData,
        stateCounts: stateCounts,
        goBackState: goBackState,
        goToState: goToState
      };

      init();

      return service;

      ///////////////

      function goBackState() {
        var preState = $rootScope.previousState;
        if (preState) {
          $state.transitionTo(preState);
        } else {
          $state.transitionTo('home');
        }
      }

      function init() {
        stateChangeStart();
        stateChangeError();
        stateChangeSuccess();
      }

      function stateChangeStart() {
        $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams, error) {
            var isLogged = authService.isAuthenticated();
            // state.config.authenticate default: false
            if (toState.authenticate && !isLogged) {
              $state.transitionTo('auth');
              logger.warning('Please login');
              event.preventDefault();
            } else if (toState.name === 'auth' && isLogged) {
              $state.transitionTo('home');
              event.preventDefault();
            }
          }
        );
      }

      function stateChangeError() {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice
        $rootScope.$on('$stateChangeError',
          function(event, toState, toParams, fromState, fromParams, error) {
            if (handlingStateChangeError) {
              return;
            }
            stateCounts.errors++;
            handlingStateChangeError = true;
            var destination = (toState &&
              (toState.title || toState.name || toState.loadedTemplateUrl)) ||
              'unknown target';
            var msg = 'Error routing to ' + destination + '. ' + 
              (error.data || '') + '. <br/>' + (error.statusText || '') +
              ': ' + (error.status || '');
            logger.warning(msg, [toState]);
            $location.path('/');
          }
        );
      }

      function stateData() {
        return $state.current.data;
      }

      function currentState() {
        return $state.current;
      }

      function hash(newHash) {
        if (newHash) $location.hash(newHash);
        return $location.hash();
      }

      function goToState(state) {
        $state.transitionTo(state);
      }

      function stateChangeSuccess() {
        $rootScope.$on('$stateChangeSuccess',
          function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState  = toState;

            // not record if two states in the same page
            if (fromState.parent != toState.parent) {
              $rootScope.previousState = fromState;
            }
            stateCounts.changes++;
            handlingStateChangeError = false;
            var title = config.docTitle + ' ' + (toState.title || '');
            $rootScope.title = title; // data bind to <title>
          }
      );
      }
    }
  }
})();
