describe("UserLogIn", function() {
  it('a user can not log in, without having signed up', function() {
    browser.get("http://localhost:8000");
    element(by.css('#choose-login')).click();
    element(by.css('#user-login')).element(by.model('userCtrl.email')).sendKeys('test@email.com');
    element(by.css('#user-login')).element(by.model('userCtrl.password')).sendKeys('password');
    $('#logIn').click();
    var welcome = element(by.css('h2'));
    expect(welcome.isDisplayed()).toBeFalsy();
    // expect(welcome.getText()).toEqual('logged in as  Test Name');
    // add to test if the right user is included

  });



});
