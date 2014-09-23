'use strict';

describe('Parents CRUD', function() {
  
  var browser = require('../helpers/protractor_helper.js')();
  
  var parents = require('../../../server/testing_fixtures/parents.js');
  
  describe('When visit /parents', function() {
    it('Should display all parents', function() {
      
      browser.get('/#/parents');
      
      browser.column('parent in parents', 'parent.user.name').then(function(names) {
          expect(names[0].getText()).toBe(parents[0].name + ' ' + parents[0].user.surname);
          expect(names[1].getText()).toBe(parents[1].name + ' ' + parents[1].user.surname);
          expect(names[2].getText()).toBe(parents[2].name + ' ' + parents[2].user.surname);
        });
    }, browser.timeout());
  });
  
  describe('When click on edit link of the parent', function() {
    it('Should load form with parent data correctly', function() {
      
      var row = browser.row('parent in parents', 1);
      
      browser.row_link(row, 'a[href*=edit]').click();
      
      expect(browser.input_value('parent.user.name')).toBe(parents[0].user.name);
      
      expect(browser.input_value('parent.user.surname')).toBe(parents[0].user.surname);
      
      expect(browser.input_value('parent.user.id_card')).toBe(parents[0].user.id_card);
      
      expect(browser.input_value('parent.user.email')).toBe(parents[0].user.email);
      
      expect(browser.input_value('parent.phone')).toBe(parents[0].phone);
      
      expect(browser.input_value('parent.user.address')).toBe(parents[0].user.address);
      
    }, browser.timeout());
  });
  
  describe('When edit parent properties and save these changes', function() {
    it('Should redirect to parent list, show parent change and a success notification', function() {
      
      browser.input('parent.user.name').clear();
      browser.input('parent.user.name').sendKeys('Mark changed');
      
      browser.css('.form-horizontal button').click();
      
      browser.wait();
      
      var name = browser.row_column('parent in parents', 1, 'parent.user.name');
      
      expect(name.getText()).toBe('Mark changed' + ' ' + parents[0].user.surname);
      
    }, browser.timeout());
  });
  
  describe('Create a parent', function() {
    
    describe('When the parent is created appropriately', function() {
      it('Should redirect to parent list, add display the parent created', function() {
        
        var new_parent = {name: 'Sarah', surname: 'Coleman', id_card: '2563148970',
                          email: 'sara.coleman@hotmail.com', birthday:'2000', phone:'1253695200',
                          address:'Cuenca', photo:'', blocked:false};
        
        browser.get('/#/parents/create');
        
        browser.input('parent.user.id_card').sendKeys(new_parent.id_card);
        browser.input('parent.user.name').sendKeys(new_parent.name);
        browser.input('parent.user.surname').sendKeys(new_parent.surname);
        browser.input('parent.user.email').sendKeys(new_parent.email);
        browser.input('parent.user.address').sendKeys(new_parent.address);
        browser.input('parent.phone').sendKeys(new_parent.phone);
          
        browser.css('button[type=submit]').click();
        
        browser.wait();
        
        var name = browser.row_column('parent in parents', 5, 'parent.name');
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/parents');
        
        expect(name.getText()).toBe(new_parent.name + ' ' + new_parent.surname);
        
      }, browser.timeout());
    });
    
    describe('When a required field is empty', function() {
      it('Should not change the URL', function() {
        /*Required fieds [id_card, name, surname, email, phone, address]*/
        
        browser.get('/#/parents/create');
        browser.input('parent.id_card').sendKeys('');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/parents/create');
        
      }, browser.timeout());
    });
    
    describe('When the field name or surname has letters and numbers', function() {
      it('Should not change the URL, and show danger notification', function() {
        
        browser.get('/#/parents/create');
        
        browser.input('parent.user.id_card').sendKeys('0258963147');
        browser.input('parent.user.name').sendKeys('John');
        browser.input('parent.user.surname').sendKeys('Doe456');
        browser.input('parent.user.email').sendKeys('john@test.com');
        browser.input('parent.user.address').sendKeys('Teachers address');
        browser.input('parent.phone').sendKeys('1234568970');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/parents/create');
        
      }, browser.timeout());
    });
  });
});
