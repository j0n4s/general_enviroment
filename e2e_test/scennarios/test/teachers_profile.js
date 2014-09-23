'use strict';

var protractor = require('../../protractor_jasmine');

var teachers = require('../../../server/testing_fixtures/teachers.js');

describe('Teacher profile', function() {
  
  var browser = require('../helpers/protractor_helper.js')();
  
  var teacher_of_jor_el_school = teachers[3];
  
  describe('When user logged is a teacher', function() {
    it('should go to /', function() {
      browser.get('/#/login');
      browser.input('email').sendKeys(teacher_of_jor_el_school.email);
      browser.input('password').sendKeys('superhero');
      
      browser.css('button[type=submit]').click();
      browser.wait();
      
      expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/');
      
    }, browser.timeout());
  });
});
