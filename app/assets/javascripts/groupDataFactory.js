paymentApp.factory('groupDataFactory', ['$http', function($http) {
  var groupDataFactory = function() {};

  groupDataFactory.prototype.createGroup = function (group) {
    var queryUrl = '/groups';
    var headers = { headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }};
    return $http.post(queryUrl, group, headers);
  };

  groupDataFactory.prototype.getAllUsers = function () {
    var queryUrl = '/users';
    return $http.get(queryUrl);
  };

  return groupDataFactory;

}]);
