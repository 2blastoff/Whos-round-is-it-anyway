paymentApp.service('userDataService', ['$http', function($http) {
  var self = this;

  self.sendUserSignUp = function(user) {
    var queryUrl = '/users';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    return $http.post(queryUrl, user, headers);
  };

  self.sendUserLogIn = function(user) {
    var queryUrl = '/users/sign_in';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    return $http.post(queryUrl, user, headers);
  };

  self.logOut = function() {
    return $http.delete('/users/sign_out');
  };

  self.checkSession = function() {
    return $http.get('/session');
  };
}]);
