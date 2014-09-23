'use strict';

describe('schools crud', function() {

  var browser = require('../helpers/protractor_helper.js')();

  describe('when on schools list', function(){
    it('should render 2 schools returned by server', function() {

      browser.get('/#/schools');

      browser.column('school in schools', 'school.name').then(function(names) {
          expect(names.length).toBe(2);
          expect(names[0].getText()).toBe('Xavier High School');
          expect(names[1].getText()).toBe('Jor El Observatory');
        });

    }, browser.timeout());
  });

  describe('when in the edit school view', function() {
    it('should render form with school data correctly', function() {
      var row = browser.row('school in schools', 1);
      
      browser.row_link(row, 'a[href*=edit]').click();
      
      expect(browser.input_value('school.name')).toBe('Xavier High School');
      expect(browser.input_value('school.phone')).toBe('123123123');
      expect(browser.input_value('school.address')).toBe('Classified');
      expect(browser.input_value('school.email')).toBe('charles.xavier@provedatos.com');
      
    }, browser.timeout());
  });

  describe('when edit school properties', function() {
    it('should redirect to schools list, show schools changes and a success notification', function() {
      browser.input('school.name').clear();
      
      browser.input('school.name').sendKeys('Xavier is dead');

      browser.css('.form-horizontal button').click();
      
      browser.wait();

      var new_name_showed = browser.row_column('school in schools',1, 'school.name');
      
      browser.css('.gritter-with-image').getText().then(function(notification) {
        expect(notification).not.toBe('');
      });
      
      expect(new_name_showed.getText()).toBe('Xavier is dead');
    }, browser.timeout());
  });
  
  describe('Create a school', function() {
    describe('When the school is created appropriately', function() {
      var new_school = {name:'Martim Cerere', address:'X And Y',
                          phone:'123456789', email:'martin@test.com'
                        };
                          
      it('Should redirect to schools list, add display the school created in the list', function() {
        
        browser.get('/#/schools/create');
        
        browser.input('school.name').sendKeys(new_school.name);
        browser.input('school.email').sendKeys(new_school.email);
        browser.input('school.phone').sendKeys(new_school.phone);
        browser.input('school.address').sendKeys(new_school.address);
        
        browser.css('button[type=submit]').click();
        browser.wait();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/schools');
        
        var school_name = browser.row_column('school in schools', 3, 'school.name');
        var school_address = browser.row_column('school in schools', 3, 'school.address');
        var school_phone = browser.row_column('school in schools', 3, 'school.phone');
        
        expect(school_name.getText()).toBe(new_school.name);
        expect(school_address.getText()).toBe(new_school.address);
        expect(school_phone.getText()).toBe(new_school.phone);
      });
    }, browser.timeout());
    
    describe('When a required field is empty', function() {
      it('Should not change the URL', function() {
        /*Required fieds [name, phone, address]*/
        
        browser.get('/#/schools/create');
        browser.input('school.name').sendKeys('');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/schools/create');
        
      }, browser.timeout());
    });
  });
});

