/* jshint -W117, -W030 */
describe('AuthController', function() {
  var authController;
  
  beforeEach(function(){
    module('app.auth');
    inject(function($controller, $rootScope) {
      var rootScope = $rootScope.$new();
      var service = {};
      
      authController = $controller('AuthController', {
        $scope: rootScope,
        authService: service,
      });
    });
  });

  it('should have correct title', function() {
    expect(authController.title).toBe('Authentication');
  });
});

