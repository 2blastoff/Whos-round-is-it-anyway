paymentApp.controller('UserController', ['userDataService' , function(userDataService){

  var self = this;
  self.chooseSignUp = false;
  self.chooseLogIn = false;
  self.userName = "";
  self.email = "";
  self.password = "";
  self.passwordConfirmation = "";
  self.loggedInStatus = false;

  self.noOptionChosen = function() {
    if (!self.chooseSignUp && !self.chooseLogIn) { return true; }
  };

  self.isLoggedIn = function(){
     userDataService.checkSession()
      .then(function(response) {
        if (response.data.id === 0) {
          self.loggedInStatus = false;
        } else {
          self.loggedInStatus = true;
          self.userId = response.data.id;
          self.userName = response.data.username;
          if(response.data.groups.length > 0) { self.groupId = response.data.groups[0].id; }
        }
     });
  };

  self.signUp = function(){
    var user = { user: {username: self.userName, email: self.email, password: self.password, password_confirmation: self.passwordConfirmation } };
    userDataService.sendUserSignUp(user)
      .then(function(){
        self.loggedInStatus = true;
      });
  };

  self.logIn = function() {
    var user = {user: {email: self.email, password: self.password }};
    userDataService.sendUserLogIn(user).then(function(response){
      self.userId = response.data.id;
      self.userName = response.data.username;
      if(response.data.groups.length > 0) { self.groupId = response.data.groups[0].id; }
      self.loggedInStatus = true;
    }, function(response) {
      self.loggedInStatus = false;
      self.chooseSignUp = false;
      self.chooseLogIn = false;
      self.password = "";
    });
  };

  self.logOut = function() {
    userDataService.logOut().then(function() {
      self.loggedInStatus = false;
      self.chooseSignUp = false;
      self.chooseLogIn = false;
      self.password = "";
    });
  };
  self.isLoggedIn();
}]);
