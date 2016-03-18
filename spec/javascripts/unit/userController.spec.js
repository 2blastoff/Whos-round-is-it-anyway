describe('UserController', function() {
  beforeEach(module('PaymentApp'));

  var ctrl, user, userDataService, $q, $rootScope;

  beforeEach(inject(function($controller) {
    ctrl = $controller('UserController');
    user = {};
    userDataService = { sendUserSignUp: function(){}, logOut: function(){}};
  }));

  describe("checking logged in status",function(){

    it("a user is not logged in from the beginning",function(){
      expect(ctrl.loggedInStatus).toEqual(false);
    });

    it("signing up changes the login status",function(){
      ctrl.signUp();
      expect(ctrl.isLoggedIn()).toEqual(true);
    });

    it("logging in changes the login status",function(){
      ctrl.logIn();
      expect(ctrl.isLoggedIn()).toEqual(true);
    });
  });

});
