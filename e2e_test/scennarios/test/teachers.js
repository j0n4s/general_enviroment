'use strict';

describe('Teacher CRUD', function() {
  var teachers = require('../../../server/testing_fixtures/teachers.js');
  
  var browser = require('../helpers/protractor_helper.js')();
  
  describe('When visit /teachers', function() {
    it('Should display all teachers', function() {
      
      browser.get('/#/login');
      browser.input('email').sendKeys('dr.manhattan@watchmen.com');
      browser.input('password').sendKeys('superhero');
      
      browser.css('button[type=submit]').click();
      browser.wait();
      
      browser.get('/#/teachers');
      
      browser.column('teacher in teachers', 'teacher.name').then(function(names) {
          expect(names[0].getText()).toBe(teachers[0].user.name + ' ' + teachers[0].user.surname);
          expect(names[1].getText()).toBe(teachers[1].user.name + ' ' + teachers[1].user.surname);
          expect(names[2].getText()).toBe(teachers[2].user.name + ' ' + teachers[2].user.surname);
        });
      
    }, browser.timeout());
  });
  
  describe('When click on edit link of the teacher', function() {
    it('Should load form with teacher data correctly', function() {
      
      var element = 1;
      
      var row = browser.row('teacher in teachers', element);
      
      browser.row_link(row, 'a[href*=edit]').click();      
      
      expect(browser.input_value('teacher.user.name')).toBe(teachers[element - 1].user.name);
      
      expect(browser.input_value('teacher.user.surname')).toBe(teachers[element - 1].user.surname);
      
      expect(browser.input_value('teacher.user.id_card')).toBe(teachers[element - 1].user.id_card);
      
      expect(browser.input_value('teacher.user.email')).toBe(teachers[element - 1].user.email);
      
      expect(browser.input_value('teacher.phone')).toBe(teachers[element - 1].phone);
      
      expect(browser.input_value('teacher.user.address')).toBe(teachers[element - 1].user.address);
      
    }, browser.timeout());
  });
  
  describe('When edit teacher properties and save these changes', function() {
    it('Should redirect to teacher list, show teacher change and a success notification', function() {
      
      browser.input('teacher.user.name').clear();
      
      browser.input('teacher.user.name').sendKeys('Wolverine changed');
      
      browser.id('teacher_birthday').clear();
      
      browser.id('teacher_birthday').sendKeys('01/01/88');
      
      browser.css('button[type=submit]').click();
      
      var new_name = browser.row_column('teacher in teachers', 1, 'teacher.user.name');
      
      expect(new_name.getText()).toBe('Wolverine changed' + ' ' + teachers[0].user.surname);
      
    }, browser.timeout());
  });
  
  describe('Create a Teacher', function() {
    
    describe('When the teacher is created appropriately', function() {
      it('Should redirect to teacher list, add display the teacher created', function() {
        
        var new_teacher = {name: 'Sarah', surname: 'Coleman', birthday:'3/12/85', id_card: '2563148970', 
                          email: 'sara.coleman@hotmail.com', phone:'1253695200',
                          address:'Cuenca', biography:'', resume:''};
        
        browser.get('/#/teachers/create');
        
        browser.input('teacher.user.id_card').sendKeys(new_teacher.user.id_card);
        browser.input('teacher.user.name').sendKeys(new_teacher.user.name);
        browser.input('teacher.user.surname').sendKeys(new_teacher.user.surname);
        browser.id('teacher_birthday').sendKeys(new_teacher.user.birthday);
        browser.input('teacher.user.email').sendKeys(new_teacher.user.email);
        browser.input('teacher.user.address').sendKeys(new_teacher.user.address);
        browser.input('teacher.phone').sendKeys(new_teacher.phone);
          
        browser.css('button[type=submit]').click();
        
        var name = browser.row_column('teacher in teachers', 5, 'teacher.user.name');
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/teachers');
        
        expect(name.getText()).toBe(new_teacher.user.name + ' ' + new_teacher.user.surname);
        
      }, browser.timeout());
    });
    
    describe('When a required field is empty', function() {
      it('Should not change the URL', function() {
        /*Required fieds [id_card, name, surname, email, phone, address]*/
        
        browser.get('/#/teachers/create');
        browser.input('teacher.user.id_card').sendKeys('');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/teachers/create');
        
      }, browser.timeout());
    });
    
    describe('When the field name or surname has letters and numbers', function() {
      it('Should not change the URL, and show danger notification', function() {
        
        browser.get('/#/teachers/create');
        browser.input('teacher.user.name').sendKeys('John123');
        browser.input('teacher.user.surname').sendKeys('Doe');
        browser.input('teacher.user.id_card').sendKeys('0258963147');
        browser.input('teacher.user.email').sendKeys('john@test.com');
        browser.input('teacher.phone').sendKeys('1234568970');
        browser.input('teacher.user.address').sendKeys('Teachers address');
        
        browser.css('button[type=submit]').click();
        
        expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/teachers/create');
        
      }, browser.timeout());
    });
    
  });
});
