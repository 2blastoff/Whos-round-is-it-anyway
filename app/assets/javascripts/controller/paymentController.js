paymentApp.controller('PaymentController', ['currentPayerDataFactory', 'sessionDataService', function(currentPayerDataFactory, sessionDataService){

  var self = this;
  var currentPayerData = new currentPayerDataFactory();

  self.show = false;


  self.setShowPayer = function() {
    self.show = true;
  };

  self.showPayer = function() {
    return self.show;
  };

  self.getPayerName = function() {
    return sessionDataService.currentPayer.username;
  };

  self.updateCurrentPayer = function() {
    currentPayerData.retrieveCurrentPayer()
      .then(function(response) {
        sessionDataService.currentPayer = response.data;
      });
  };

  self.pay = function (paymentAmount ) {
    currentPayerData.makePayment ( paymentAmount )
      .then(function(response) {
        sessionDataService.currentPayer = response.data;
        self.paymentAmount = "";
        self.show = false;
      });
  };
}]);
