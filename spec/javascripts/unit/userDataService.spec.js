describe('service: userDataService', function() {

  var userData, user;

  beforeEach(module('PaymentApp'));

  beforeEach(inject(function(userDataService, $httpBackend) {
    userData = userDataService;
    httpBackend = $httpBackend;
    user = { user: {username: 'Test', email: 'test@email.com', password: 'password', password_confirmation: 'password'} };
  }));

  describe('signing up', function() {
    it('responds to sendUserSignUp', function() {
      httpBackend
        .when('POST', '/users', user)
        .respond(
          { status: 200  });
      userData.sendUserSignUp(user)
      .then(function(response){
        expect(response.status).toEqual(200);
      });
      httpBackend.flush();
    });
  });

  describe('logging in', function() {
    var responseUser = {};
    var user2 = {email: 'test@email.com', password: 'password'};

    it('responds to sendUserLogIn', function() {
      httpBackend
        .when('POST', '/users/sign_in', user2)
        .respond(
          { status: 200, data: responseUser });
      userData.sendUserLogIn(user2)
      .then(function(response){
        expect(response.status).toEqual(200);
        expect(response.data.data).toEqual(responseUser);
      });
      httpBackend.flush();
    });
  });

  describe('#logOut', function() {
    it('responds to logOut', function() {
      httpBackend
        .when('DELETE', '/users/sign_out')
        .respond(
          { status: 200  });
      userData.logOut()
      .then(function(response){
        expect(response.status).toEqual(200);
      });
      httpBackend.flush();
    });
  });

  describe('#checkSession', function() {
    it('responds to checkSession', function() {
      httpBackend
        .when('GET', '/session')
        .respond(
          { status: 200  });
      userData.checkSession()
      .then(function(response){
        expect(response.status).toEqual(200);
      });
      httpBackend.flush();
    });
  });

});
