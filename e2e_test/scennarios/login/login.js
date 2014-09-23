'use strict';

require('selenium-webdriver');
var app = require('../app.js');

describe('login page', function() {
  describe('when opening aplication not logged in', function(){
    it('should go to /login', function() {

      app.auth.logout()
      .then(function() {

        browser.get('/#/schools');
        return browser.getCurrentUrl();
      })
      .then(function(url){
        var route = url.split('#')[1];
        expect(route).toBe('/login');
      });

    }, browser.timeout());
  });

  describe('when unathorized login', function() {
    it('should show an error', function() {

      app.auth.login('tony@stark.com', 'black widow')
      .then(function() {

        element(by.css('[ng-show=\"error_login\"]')).getText().then(function(error_message) {
          expect(error_message !== '').toBe(true);
        });
      });

    }, browser.timeout());
  });

  describe('when login successful', function(){
    it('should go to /', function() {

      app.auth.login_as_superadmin()
      .then(function() {
        return browser.getCurrentUrl();
      })
      .then(function(url) {
        var route = url.split('#')[1];
        expect(route).toBe('/');
      });

    }, browser.timeout());
  });

  it('should log out', function() {
    browser.get('/#/');
    app.auth.logout();
  }, browser.timeout());
});
