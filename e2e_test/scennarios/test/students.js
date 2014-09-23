'use strict';

describe('Students CRUD', function() {

  var students = require('../../../server/testing_fixtures/students.js');
  var admins = require('../../../server/testing_fixtures/admins.js');
  var admin_of_xavier_school = admins[0];

  var browser = require('../helpers/protractor_helper.js')();

  var full_name = function(name, surname) {
    return name + ' ' + surname;
  };

  describe('When /students', function() {
    it('should display all students', function() {

      browser.get('/#/login');
      browser.input('email').sendKeys(admin_of_xavier_school.email);
      browser.input('password').sendKeys('superhero');

      browser.css('button[type=submit]').click();
      browser.wait();

      browser.get('/#/students');

      browser.column('student in $data', 'student.user.id_card').then(function(id_cards) {
        expect(id_cards[0].getText()).toBe(students[0].user.id_card);
        expect(id_cards[1].getText()).toBe(students[1].user.id_card);
        expect(id_cards[2].getText()).toBe(students[2].user.id_card);
      });

      browser.column('student in $data', 'student.name').then(function(names) {
        expect(names[0].getText()).toBe(full_name(students[0].name, students[0].user.surname));
        expect(names[1].getText()).toBe(full_name(students[1].name, students[1].user.surname));
        expect(names[2].getText()).toBe(full_name(students[2].name, students[2].user.surname));
      });

      browser.column('student in $data', 'student.user.email').then(function(emails) {
        expect(emails[0].getText()).toBe(students[0].user.email);
        expect(emails[1].getText()).toBe(students[1].user.email);
        expect(emails[2].getText()).toBe(students[2].user.email);
      });
    }, browser.timeout());
  });

  //describe('When visit edit student page', function() {
    //it('Should load form with student data correctly', function() {
      //var row = browser.row('student in students', 1);

      //browser.row_link(row, 'a[href*=edit]').click();

      //expect(browser.input_value('student.id_card')).toBe(students[0].id_card);
      //expect(browser.input_value('student.name')).toBe(students[0].name);
      //expect(browser.input_value('student.surname')).toBe(students[0].surname);
      //expect(browser.input_value('student.email')).toBe(students[0].email);

    //}, browser.timeout());
  //});

  //describe('When edit student properties and save these changes', function() {
    //it('Should redirect to students list, show student change and a success notification', function() {
      //var new_name = 'Kurt changed';

      //browser.input('student.name').clear();

      //browser.input('student.name').sendKeys(new_name);

      //browser.id('student_birthday').clear();

      //browser.id('student_birthday').sendKeys('01/01/88');

      //browser.css('button[type=submit]').click();

      //browser.wait();

      //var new_first_name = browser.row_column('student in students', 3, 'student.name');

      //expect(new_first_name.getText()).toBe(full_name(new_name, students[0].surname));

    //}, browser.timeout());
  //});


  //describe('When the student is created appropriately', function() {

    //var new_student = {id_card:'0123456789', name:'Student', surname:'Test', birthday:'3/12/85', 
      //email:'student@test.com', phone:'0982524651', address:'X And Y'
    //};

    //it('Should redirect to students list, add display the student created in the list', function() {

      //browser.get('/#/students/create');

      //browser.input('student.id_card').sendKeys(new_student.id_card);
      //browser.input('student.name').sendKeys(new_student.name);
      //browser.input('student.surname').sendKeys(new_student.surname);
      //browser.id('student_birthday').sendKeys(new_student.birthday);
      //browser.input('student.email').sendKeys(new_student.email);
      //browser.input('student.address').sendKeys(new_student.address);
      //browser.input('student.phone').sendKeys(new_student.phone);

      //browser.css('button[type=submit]').click();
      //browser.wait();

      //expect(browser.getCurrentUrl()).toBe('http://localhost:3001/#/students');

      //var student_id_card = browser.row_column('student in students', 4, 'student.id_card');
      //var student_name = browser.row_column('student in students', 4, 'student.name');
      //var student_email = browser.row_column('student in students', 4, 'student.email');

      //expect(student_id_card.getText()).toBe(new_student.id_card);

      //expect(student_name.getText()).toBe(full_name(new_student.name, new_student.surname));

      //expect(student_email.getText()).toBe(new_student.email);

    //}, browser.timeout());
  //});

  //describe('When edit student name is empty and try to save these changes', function() {
    //it('Should not save, show popup message', function() {

      //browser.get('/#/students');

      //var row = browser.row('student in students', 2);

      //browser.row_link(row, 'a[href*=edit]').click();

      //var last_edit_url = browser.getCurrentUrl();

      //browser.input('student.name').clear();

      //browser.css('.form-horizontal button.btn-primary').click();

      //browser.wait();

      //expect(browser.getCurrentUrl()).toMatch(last_edit_url);

    //}, browser.timeout());
  //});

  //describe('When edit student name and add numbers in filed', function() {
    //it('Should not save, show popup message', function() {

      //browser.get('/#/students');

      //var row = browser.row('student in students', 1);

      //browser.row_link(row, 'a[href*=edit]').click();

      //var last_edit_url = browser.getCurrentUrl();

      //browser.input('student.name').clear();

      //browser.input('student.name').sendKeys({name: 'Test 12345'});
      ////add name with numbers

      //browser.css('.form-horizontal button.btn-primary').click();
      //browser.wait();

      //expect(browser.getCurrentUrl()).toMatch(last_edit_url);

    //}, browser.timeout());
  //});
});
