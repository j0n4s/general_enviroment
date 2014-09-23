'use strict';

describe('Admin CRUD, user profile = admin', function() {
  
  var admins = require('../../../server/testing_fixtures/admins.js');
  var helper_ids = require('../../../server/testing_fixtures/helper_ids.js');
  
  var browser = require('../helpers/protractor_helper.js')();
  
  describe('When visit /admins', function() {
    it('Should display all admins', function() {
      
      browser.get('/#/admins');
      
      var names = browser.column('admin in admins', 'admin.name').then(function(names) {
        expect(names[0].getText()).toBe(admins[0].name + ' ' + admins[0].surname);
        expect(names[1].getText()).toBe(admins[1].name + ' ' + admins[1].surname);
      });
    }, browser.timeout());
  });
  
  describe('When click on edit link of the admin', function() {
    it('Should load form with admin data correctly', function() {
      
      var row = browser.row('admin in admins', 1);
      
      browser.row_link(row, 'a[href*=edit]').click();
      
      browser.input_value('admin.name').then(function(name) {
        expect(name).toBe(admins[0].name);
      });
      
      browser.input_value('admin.surname').then(function(surname) {
        expect(surname).toBe(admins[0].surname);
      });
      
      browser.input_value('admin.id_card').then(function(id_card) {
        expect(id_card).toBe(admins[0].id_card);
      });
      
      browser.input_value('admin.email').then(function(email) {
        expect(email).toBe(admins[0].email);
      });
      
      browser.input_value('admin.phone').then(function(phone) {
        expect(phone).toBe(admins[0].phone);
      });
      
      browser.input_value('admin.address').then(function(address) {
        expect(address).toBe(admins[0].address);
      });
      
    }, browser.timeout());
  });
  
  describe('When edit admin properties and save these changes', function() {
    it('Should redirect to admin list, show admin change and a success notification', function() {
      
      browser.input('admin.name').clear();
      
      browser.input('admin.name').sendKeys('James changed');
      
      browser.css('.form-horizontal button').click();
      
      var name = browser.row_column('admin in admins', 1, 'admin.name');
      
      expect(name.getText()).toBe('James changed' + ' ' + admins[0].surname);
      
    }, browser.timeout());
  });
  
  describe('Create a Admin', function() {
    
    var new_admin = { name:'James', surname:'Rupert Rhodes',
                      id_card:'2589631425', email:'warmachine@dc.com', phone:'5623012355',
                      address:'NY', photo:'', blocked:false, school: helper_ids[0].school_id
                    };
    
    describe('When the admin is created appropriately', function() {
      it('Should redirect to admin list, add display the admin created', function() {
        
        browser.get('/#/admins/create');
        
        browser.id('admin_school_chosen').click();
        
        browser.class_name('highlighted').click();
        
        browser.input('admin.name').sendKeys(new_admin.name);
        browser.input('admin.surname').sendKeys(new_admin.surname);
        browser.input('admin.id_card').sendKeys(new_admin.id_card);
        browser.input('admin.email').sendKeys(new_admin.email);
        browser.input('admin.address').sendKeys(new_admin.address);
        browser.input('admin.phone').sendKeys(new_admin.phone);
        
        browser.css('button[type=submit]').click();
        
        browser.wait();
        
        var name = browser.row_column('admin in admins', 3, 'admin.name');
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/admins');
        
        expect(name.getText()).toBe(new_admin.name + ' ' + new_admin.surname);
        
      }, browser.timeout());
    });
    
    describe('When a required field is empty', function() {
      it('Should not allow submission without required fields', function() {
        /*Required fieds [school, id_card, name, surname, email]*/
        
        browser.get('/#/admins/create');
        
        browser.input('admin.id_card').sendKeys('');
        
        browser.css('button[type=submit]').click();
        
        browser.css('button[type=submit]').isEnabled().then(function(value) {
          expect(value).toBe(true);
        });
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/admins/create');
        
      }, browser.timeout());
    });
    
    describe('When the field name or surname has letters and numbers', function() {
      it('Should not change the URL, and show danger notification', function() {
        
        browser.get('/#/admins/create');
        
        browser.id('admin_school_chosen').click();
        
        browser.class_name('highlighted').click();
        
        browser.input('admin.name').sendKeys('John123');
        browser.input('admin.surname').sendKeys('Doe');
        browser.input('admin.id_card').sendKeys('0258963147');
        browser.input('admin.email').sendKeys('john@test.com');
        browser.input('admin.address').sendKeys('X AND Y');
        browser.input('admin.phone').sendKeys('0123456789');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/admins/create');
        
      }, browser.timeout());
    });
    
  });
});