'use strict';

describe('Superadmin CRUD, user profile = superadmin', function() {
  
  var superadmins = require('../../../server/testing_fixtures/superadmins.js');
  
  var browser = require('../helpers/protractor_helper.js')();
  
  describe('When visit /superadmins', function() {
    it('Should display all superadmins', function() {
      
      browser.get('/#/superadmins');
      
      browser.column('superadmin in superadmins', 'superadmin.user.name').then(function(names) {
          expect(names[0].getText()).toBe(superadmins[0].user.name + ' ' + superadmins[0].user.surname);
          expect(names[1].getText()).toBe(superadmins[1].user.name + ' ' + superadmins[1].user.surname);
        });
      
    }, browser.timeout());
  });
  
  describe('When click on edit link of the superadmin', function() {
    it('Should load form with superadmin data correctly', function() {
      
      var row = browser.row('superadmin in superadmins', 1);
      
      browser.row_link(row, 'a[href*=edit]').click();      
      
      expect(browser.input_value('superadmin.user.name')).toBe(superadmins[0].user.name);
      
      expect(browser.input_value('superadmin.user.surname')).toBe(superadmins[0].user.surname);
      
      expect(browser.input_value('superadmin.user.id_card')).toBe(superadmins[0].user.id_card);
      
      expect(browser.input_value('superadmin.user.email')).toBe(superadmins[0].user.email);
      
    }, browser.timeout());
  });
  
  describe('When edit superadmin properties and save these changes', function() {
    it('Should redirect to superadmin list, show superadmin change and a success notification', function() {
      
      browser.input('superadmin.user.name').clear();
      browser.input('superadmin.user.name').sendKeys('James changed');
      
      browser.css('.form-horizontal button').click();
      
      var new_name = browser.row_column('superadmin in superadmins', 1, 'superadmin.user.name');
        
      expect(new_name.getText()).toBe('James changed' + ' ' + superadmins[0].user.surname);
      
    }, browser.timeout());
  });
  
  describe('Create a Superadmin', function() {
    
    describe('When the superadmin is created appropriately', function() {
      it('Should redirect to superadmin list, add display the superadmin created', function() {
        
        var new_superadmin =  { name:'James', surname:'Rupert Rhodes', id_card:'2589631425',
                                email:'warmachine@dc.com', phone:'5623012355', address:'NY',
                                photo:'', blocked:false
                              };
                        
        browser.get('/#/superadmins/create');
        
        browser.input('superadmin.user.name').sendKeys(new_superadmin.user.name);
        browser.input('superadmin.user.surname').sendKeys(new_superadmin.user.surname);
        browser.input('superadmin.user.id_card').sendKeys(new_superadmin.user.id_card);
        browser.input('superadmin.user.email').sendKeys(new_superadmin.user.email);
        
        browser.css('button[type=submit]').click();
        
        browser.wait();
        
        var name = browser.row_column('superadmin in superadmins', 3, 'superadmin.user.name');
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/superadmins');
        expect(name.getText()).toBe(new_superadmin.user.name + ' ' + new_superadmin.user.surname);
        
      }, browser.timeout());
    });
    
    describe('When a required field is empty', function() {
      it('Should not change the URL', function() {
        /*Required fieds [id_card, name, surname, email]*/
        
        browser.get('/#/superadmins/create');
        browser.input('superadmin.id_card').sendKeys('');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/superadmins/create');
        
      }, browser.timeout());
    });
    
    describe('When the field name or surname has letters and numbers', function() {
      it('Should not change the URL, and show danger notification', function() {
        
        browser.get('/#/superadmins/create');
        browser.input('superadmin.user.name').sendKeys('John123');
        browser.input('superadmin.user.surname').sendKeys('Doe');
        browser.input('superadmin.user.id_card').sendKeys('0258963147');
        browser.input('superadmin.user.email').sendKeys('john@test.com');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/superadmins/create');
        
      }, browser.timeout());
    });
    
  });
});
