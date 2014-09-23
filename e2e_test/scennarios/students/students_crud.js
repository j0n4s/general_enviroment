'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Students CRUD', function() {

  var new_student = {
    'student.user.id_card': '1003888920',
    'student.user.name': 'Spiderman',
    'student.user.second_name': 'Peter',
    'student.user.surname': 'TheAmazing',
    'student.user.second_surname': 'Parker',
    'student.user.gender': 'M',
    'student.user.birthday': '24/05/1983',
    'student.user.email': 'Spiderman@uncleben.com',
    'student.phone': '123456789'
  };

  var extra_data = {
    'student.citizenship' : 'Ecuador',
    'student.user.place_of_birth': 'Quito',
    'student.blood_type': 'B+',
    'student.emergency_phone': '23489932',
    'student.home_ownership': 'Propia'
  };

  describe('creating a student', function() {
    it('should create a student', function() {
      app.auth.login_as_admin()
      .then(function() {
        app.years.change('2013-2014');
        app.students.creation_form();

        element(by.css('input.tt-input')).sendKeys('56787654567');
        app.form.submit('form button');

        app.form.fill(new_student);
        app.students.tab_additional_info();
        app.form.fill(extra_data);
        app.form.submit();
        app.students.search('Spiderman');

        expect((app.form.by_bo_bind('student.name')).getText()).toBe('Spiderman Peter');
      });

    }, browser.timeout());
  });

  describe('student transport', function(){

    var uncle_ben_address = {
      'address.name': 'uncle ben house',
      'address.main_street': 'Ingram St. Forest Hills, NY (Queens)',
      'address.number': '20',
      'address.secondary_street': '',
      'address.zip_code': '11375',
      'address.parish': 'Cotocollao'
    };

    var secret_place = {
      'address.name': 'my secret place',
      'address.main_street': 'i cant tell',
      'address.number': '0',
      'address.secondary_street': 'stop asking',
      'address.zip_code': '11375',
      'address.parish': 'Concepción'
    };

    it('should let me configure some addresses for the student', function(){
      app.students.list();
      app.students.edit('1003888920');
      app.students.tab_addresses();
      app.students.add_address();

      app.form.fill({
        'student.transport': true,
        'addresses' : [secret_place, uncle_ben_address]
      });

      app.form.submit();
    }, browser.timeout());
  });

  describe('student medical history', function() {

    var illness = {
      'illness.name': 'Asma bronquial',
      'illness.had': true,
      'illness.has': true,
      'illness.description': 'Asma grado 3'
    };

    var allergy = {
      'allergy.type': 'Medicamentos',
      'allergy.name': 'Penicilina',
      'allergy.reaction': 'Urticaria'
    };

    var vaccine = {
      'vaccine.name': 'Polio',
      'vaccine.date': '24/05/1984'
    };

    it('should let me configure medical history for the student', function() {
      app.students.list();
      app.students.edit('1003888920');
      app.students.tab_medical_history();
      app.students.tab_illness();
      app.students.add_illness();
      app.form.fill(illness);

      app.students.tab_allergies();
      app.students.add_allergy();
      app.form.fill(allergy);

      app.students.tab_vaccines();
      app.students.add_vaccine();
      app.form.fill(vaccine);

      app.students.tab_notes();
      app.form.fill({'student.medical_history.notes': 'Estudiante muy enfermizo'});

      app.form.submit();

      app.students.show('1003888920');
      app.students.tab_medical_history_info();
      app.students.tab_illness();
      expect(element(by.binding('illness.name')).getText()).toBe('Asma bronquial');

      app.students.tab_allergies();
      expect(element(by.binding('allergy.type')).getText()).toBe('Medicamentos');

      app.students.tab_vaccines();
      expect(element(by.binding('vaccine.name')).getText()).toBe('Polio');

      app.students.tab_notes();
      expect(element(by.binding('student.medical_history.notes')).getText()).toBe('Estudiante muy enfermizo');


    }, browser.timeout());
  });

  describe('creating a student and creating a parent for the student', function(){

    var new_student = {
      'student.user.id_card': '0925914244',
      'student.user.name': 'Peter',
      'student.user.second_name': 'Spiderman',
      'student.user.surname': 'Parker',
      'student.user.second_surname': 'Amazing',
      'student.user.email': 'peter@parker.com',
      'student.user.birthday': '24/05/1983',
      'student.user.gender': 'M'
    };

    var parent = {
      'parent.user.id_card': '1708724370',
      'parent.user.name': 'Benjamin',
      'parent.user.surname': 'Parker',
      'parent.user.second_surname': 'Surname',
      'parent.user.email': 'ben@uncleben.com',
      'parent.user.gender': 'M',
      'parent.phones.mobile.number': '555-345-333',
      'parent.phones.mobile.provider': 'CNT'
    };

    var parent_aditional_data = {
      'parent.citizenship': 'Ecuador',
      'parent.education_level': 'Bachiller',
    };

    var parent_address_data = {
      'parent.home_address': '20 Ingram St. Forest Hills, NY (Queens)',
      'parent.phones.home': '25443322',
    };

    var parent_profesional_data = {
      'parent.profession': 'Home address',
      'parent.occupation': '25443322',
      'parent.work_name': 'Home address',
      'parent.work_address': '30 Ingram St. Forest Hills, NY (Queens)',
      'parent.phones.work': '25223355'
    };


    it('should create a parent, asign it to the student, and save the new student', function(){

      app.students.creation_form();

      element(by.css('input.tt-input')).sendKeys('56787654567');
      app.form.submit('form button');

      app.form.fill(new_student);

      app.students.tab_relatives();
      app.students.create_relative(parent);

      app.parents.tab_additional();
      app.form.fill(parent_aditional_data);
      app.parents.tab_home();
      app.form.fill(parent_address_data);
      app.parents.tab_profesional();
      app.form.fill(parent_profesional_data);
      app.form.submit('form button[id="modal_submit"]');

      app.form.do_action_if_visible('[ng-model="relative.relationship"]','sendKeys','Tío/a');

      app.students.tab_general();

      app.form.submit();
      app.students.search('Parker');
      expect((app.form.by_bo_bind('student.name')).getText()).toBe('Peter Spiderman');

    }, browser.timeout());

    it('should let me edit the student and change info and relatives', function(){
      app.students.list();
      app.students.edit('0925914244');
      app.form.fill({'student.phone': '123456'});
      app.students.tab_relatives();

      app.form.do_action_if_visible('[ng-model="relative.parent"]','sendKeys','hollis');
      app.form.submit();

      app.students.edit('0925914244');
      expect(element(by.model('student.phone')).getAttribute('value')).toBe('123456');

      app.auth.logout()
      .then(function() {
        return app.auth.login_as_parent_hollis_manson();
      })
      .then(function() {
        app.form.click_by_index('[ng-controller="students_selector"] a',0);
        expect(element(by.css('li[ng-controller="students_selector"] ul li:last-child')).getText()).toBe(' Remy LeBeau');
      });

    }, browser.timeout());
  });
});
