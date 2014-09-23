'use strict';

var browser = require('../helpers/protractor_helper.js')();

describe('login page', function() {

  describe('when opening aplication not logged in', function(){
    it('should go to /login', function() {
      browser.get('/#/schools');
      
      browser.window_set_default_size();
      
      browser.wait();
      
      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/login');
    }, browser.timeout());
  });

  describe('when login successful', function() {
    it('should go to /', function() {
      browser.get('/#/login');
      
      browser.input('email').sendKeys('dr.manhattan@watchmen.com');
      browser.input('password').sendKeys('superhero');
      
      browser.css('button[type=submit]').click();
      
      browser.wait();
      
      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/');
      
    }, browser.timeout());
  });

  describe('when unathorized login', function() {
    it('should show an error', function() {
      browser.get('/#/login');
      
      browser.input('email').sendKeys('tony@stark.com');
      browser.input('password').sendKeys('blak window');
      
      browser.css('button[type=submit]').click();
      
      browser.wait();
      
      browser.css('[ng-show=\"error_login\"]').getText()
      .then(function(error_message) {
        expect(error_message !== '').toBe(true);
      });
      
    }, browser.timeout());
  });
});
