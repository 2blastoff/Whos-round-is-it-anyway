describe('factory: groupDataFactory', function() {

  var userData;

  beforeEach(module('PaymentApp'));

  beforeEach(inject(function(groupDataFactory, $httpBackend) {
    groupData = new groupDataFactory();
    httpBackend = $httpBackend;
  }));

  describe('#createGroup', function() {
    var group = {name: 'TestGroup', users: [{name: 'Rufus'}, {name: 'Eirick'}]};

    it('responds to createGroup', function() {
      httpBackend
        .when('POST', '/groups', group)
        .respond(
          { status: 200  });
      groupData.createGroup(group)
      .then(function(response){
        expect(response.status).toEqual(200);
      });
      httpBackend.flush();
    });
  });

  describe('#getAllUsers', function() {
    var user = {name: 'Eirik'}

    it('responds to getAllUsers', function() {
      httpBackend
        .when('GET', '/users')
        .respond(
          { users: user
        });
      groupData.getAllUsers()
      .then(function(response){
        expect(response.data.users).toEqual(user);
      });
      httpBackend.flush();
    });
  });


});
