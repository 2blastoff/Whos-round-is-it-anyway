describe('factory: currentPayerDataFactory', function() {

  var currentPayerData;

  beforeEach(module('PaymentApp'));

  beforeEach(inject(function(currentPayerDataFactory) {
    currentPayerData = new currentPayerDataFactory();
  }));

  describe('retrieving payer', function() {
    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when('GET', '/groups/1/payer')
        .respond(
          { status: 200, payer: 'Rufus' }
        );
    }));

    it('is able to retrieve current payer', function() {
      currentPayerData.retrieveCurrentPayer(1)
      .then(function(response){
        expect(response.status).toEqual(200);
        expect(response.data.payer).toEqual('Rufus');
      });
      httpBackend.flush();
    });
  });

  describe('making payments', function() {
    var payment = {name: 'Chris', amount: 100};
    var userId = 1;
    var groupId = 1;
    var paymentAmount = 100;
    var paymentHash = { group_id: groupId, user_id: userId, amount: paymentAmount}

    beforeEach(inject(function($httpBackend) {
      httpBackend = $httpBackend;
      httpBackend
        .when('POST', '/groups/1/payments', paymentHash)
        .respond(
          { status: 200, payer: 'Rufus' }
        );
    }));

    it('posts new payments and returns new current payer', function() {
      currentPayerData.makePayment(userId, groupId, paymentAmount)
      .then(function(response){
        expect(response.status).toEqual(200);
        expect(response.data.payer).toEqual('Rufus');
      });
      httpBackend.flush();
    });
  });


});
