describe('GroupController', function() {
  beforeEach(module('PaymentApp'));

  var ctrl;

  beforeEach(inject(function($controller) {
    ctrl = $controller('GroupController');
  }));

  describe("#addUser",function(){
    var user = {};

    it('should add user objects to users array', function() {
      ctrl.addUser(user);
      expect(ctrl.groupUsers).toContain(user);
    });

    it('does not allow the same user to be pushed in twice', function() {
      ctrl.addUser(user);
      ctrl.addUser(user);
      expect(ctrl.groupUsers.length).toEqual(1);
    });
  });

});
