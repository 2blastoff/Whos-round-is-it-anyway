describe("UserSignUp", function() {
  it('a user can sign up and be welcomed with their name', function() {
    browser.get("http://localhost:8000");
    element(by.css('#choose-signup')).click();
    element(by.model('userCtrl.userName')).sendKeys('Test Name');
    element(by.model('userCtrl.email')).sendKeys('test@email.com');
    element(by.model('userCtrl.password')).sendKeys('password');
    element(by.model('userCtrl.passwordConfirmation')).sendKeys('password');
    $('#signUp').click();
    var signUpForm = element(by.css('form'))
    var welcome = element(by.css('h2'));
    expect(welcome.getText()).toEqual('logged in as  Test Name');
    expect(signUpForm.isDisplayed()).toBeFalsy();
  });



});
