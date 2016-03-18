paymentApp.controller('GroupController', ['groupDataFactory', 'currentPayerDataFactory', 'sessionDataService', function(groupDataFactory, currentPayerDataFactory, sessionDataService){

  var self = this;
  var groupData = new groupDataFactory();
  var currentPayerData = new currentPayerDataFactory();

  self.allUsers = [];
  self.groupName = '';
  self.groupUsers = [];
  self.groupUsersIds = [];
  self.groupStatus = false;
  self.showCreateGroupButton = true;

  self.hideGroupButton = function() {
    self.showCreateGroupButton = false;
  };

  self.isGroupCreated = function(){
    return self.groupStatus;
  };

  self.addUser = function(user) {
    if (self.groupUsers.indexOf(user) < 0) {
      self.groupUsers.push(user);
      self.groupUsersIds.push(user.id);
    }
  };

  self.getAllUsers = function() {
    groupData.getAllUsers()
      .then(function(response) {
        self.allUsers = response.data;
      });
  };

  self.createGroup = function() {
    var group = { group: { name: self.groupName, user_ids: self.groupUsersIds } };
    groupData.createGroup(group)
      .then(function(response) {
        sessionDataService.groupId = response.data.id;
      });
    self.groupStatus = true;
  };


}]);
