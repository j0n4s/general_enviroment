'use strict';

browser.get('/#/');

module.exports = {
  logout: logout,

  login: function(email, password){
    return logout()
    .then(function() {
      var email_input = element(by.model('email'));
      var password_input = element(by.model('password'));

      email_input.clear();
      password_input.clear();

      email_input.sendKeys(email);
      password_input.sendKeys(password);

      element(by.css('button[type=submit]')).click();
    });
  },

  login_as_superadmin: function(){
    return this.login('dr.manhattan@watchmen.com', 'superhero');
  },

  login_as_teacher: function(){
    return this.login('wolverine@xmen.com', 'superhero');
  },

  login_as_admin: function(){
    return this.login('warmachine@dc.com', 'superhero');
  },

  login_as_parent_hollis_manson: function(){
    return this.login('old_niteowl@watchmen.com', 'superhero');
  }
};

function logout() {
  return browser.getCurrentUrl()
  .then(function(url) {
    var route = url.split('#')[1];

    if(route !== '/login'){
      element(by.css('.light-blue a.dropdown-toggle')).click();
      element(by.css('a[ng-click^=logout]')).click();
    }

  });
}
