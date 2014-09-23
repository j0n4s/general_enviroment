'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Parents CRUD', function() {

  var parent_data_tab_general_info = {
    'parent.user.id_card': '1710034065',
    'parent.user.is_passport': 'no',
    'parent.user.name': 'Parent',
    'parent.user.second_name': 'SecondName',
    'parent.user.surname': 'Test',
    'parent.user.second_surname': 'SecondSurname',
    'parent.user.gender': 'M',
    'parent.user.email': 'pTest@test.com',
    'parent.phones.mobile.number': '0983862756',
    'parent.phones.mobile.provider': 'CNT'
  };

  var parent_data_tab_additional = {
    'parent.citizenship' : 'Ecuador',
    'parent.education_level' : 'Bachiller'
  };

  var parent_data_tab_home = {
    'parent.home_address' : 'Av. El Maestro',
    'parent.phones.home' : '1234567809'
  };

  var parent_data_tab_profesional = {
    'parent.profession' : 'Técnico en Física',
    'parent.occupation' : 'Profesor',
    'parent.work_name' : 'ESPE',
    'parent.work_address' : 'Av. La Patria',
    'parent.phones.work' : '03-2615-789'
  };

  describe('Creating a Parent', function() {

    var empty_fields = {
      'parent.user.id_card' : ' ',
      'parent.user.name' : ' ',
      'parent.user.surname' : ' '
    };

    describe('When a required fields is empty', function() {

      it('Should add class ng-invalid-required for each required field', function() {
        app.auth.login_as_admin()
        .then(function() {
          app.parents.creation_form();

          element(by.css('input.tt-input')).sendKeys('56787654567')
          app.form.submit('form button');

          app.form.fill(empty_fields);
          app.form.submit();

          _(empty_fields).each(function(value, key) {

            element(by.model(key))
            .getAttribute('class')
            .then(function(ng_invalid_class) {
              expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
            });
          });

          app.parents.tab_home();

          element(by.model('parent.home_address'))
          .getAttribute('class')
          .then(function(ng_invalid_class) {
            expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
          });
        });

      }, browser.timeout());

      it('Should add error message "El campo es requerido!" for each requied field', function() {
        app.parents.tab_general_info();

        var tag;

        element.all(by.css('#tab-general-info p.help-block'))
        .then(function(elements) {
          _(elements).each(function(element) {
            expect(element.getText()).toEqual('El campo es requerido!');
          });
        });

      }, browser.timeout());
    });

    describe('When the id_card is invalid and Pasport is unchecked', function() {

      it('Should add class ng-invalid-invalid_id_card for id_card field', function() {
        app.parents.tab_general_info();

        app.form.fill({'parent.user.id_card': '1234567890'});

        element(by.model('parent.user.id_card'))
        .getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-invalid_id_card') !== -1).toBe(true);
        });

      }, browser.timeout());

      it('Should add error message "Cédula inválida!"', function() {
        expect(element(by.id('parent_id_card_error')).getText()).toEqual('Cédula inválida!');
      }, browser.timeout());
    });

    describe('When Pasport is checked', function() {

      it('Should not add class ng-invalid-invalid_id_card for id_card field', function() {
        app.parents.tab_general_info();

        app.form.fill({'parent.user.id_card': '1234567890', 'parent.user.is_passport': 'yes'});

        element(by.model('parent.user.id_card')).getAttribute('class').then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-invalid_id_card') !== -1).toBe(false);
        });

      }, browser.timeout());
    });

    describe('When the email is invalid', function() {

      it('Should add class ng-invalid-email for id_card field', function() {

        app.form.fill({'parent.user.email': 'email@'});

        element(by.model('parent.user.email'))
        .getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-email') !== -1).toBe(true);
        });

      }, browser.timeout());

      it('Should add error message "Debe ser un email válido!"', function() {
        expect(element(by.id('parent_email_error')).getText()).toEqual('Debe ser un email válido!');
      }, browser.timeout());
    });

    describe('When the parent is created appropriately', function() {
      it('Should redirect to parent list, add display the parent created', function() {
        app.form.fill(parent_data_tab_general_info);
        app.parents.tab_additional();
        app.form.fill(parent_data_tab_additional);
        app.parents.tab_home();
        app.form.fill(parent_data_tab_home);
        app.parents.tab_profesional();
        app.form.fill(parent_data_tab_profesional);

        app.form.submit();

        app.parents.search('Parent');

        expect(element(by.binding('parent.user.name')).getText()).toBe('Parent SecondName');

      }, browser.timeout());
    });

  });

  describe('Editing a parent', function() {

    describe('When a required field is empty', function() {

      it('Should add class ng-invalid-required for required field', function() {

        app.parents.list();
        app.parents.edit('pTest@test.com');
        app.form.fill({'parent.user.name': ' '});

        element(by.model('parent.user.name'))
        .getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });

      }, browser.timeout());
    });

    describe('When the parent is updated appropriately', function() {
      it('Should redirect to parent list, add display the parent updated', function() {
        app.parents.list();
        app.parents.edit('pTest@test.com');
        app.form.fill({'parent.phones.mobile.number' : '1234'});
        app.form.submit();

        app.parents.edit('pTest@test.com');
        expect(element(by.model('parent.phones.mobile.number')).getAttribute('value')).toBe('1234');

      }, browser.timeout());
    });
  });


  describe('Delete parents', function() {

    describe('When parent assigned in students', function() {

      it('should display a modal with errors', function () {
        app.parents.list();
        browser.driver.manage().timeouts().implicitlyWait(1000);
        app.parents.delete('old_niteowl@watchmen.com');
        app.form.submit('[data-bb-handler="confirm"]');
        browser.sleep(400);
        expect(element(by.css('.bootbox.modal')).getText()).toContain('No se pudo eliminar el padre');
        expect(element(by.css('.bootbox.modal')).getText()).toContain('estudiantes');
        app.form.submit('[data-bb-handler="cancel"]');
      }, browser.timeout());

    });

    describe('when parent doesn\'t have assigned in students', function() {
      it('should delete the parent', function() {
        app.parents.delete('Parent');
        app.form.submit('[data-bb-handler="confirm"]');
        element(by.css('#gritter-notice-wrapper'))
        .isPresent()
        .then(function(elem) {
          expect(elem).toEqual(true);
        });

        app.parents.search('Bishop');
        element.all(by.repeater('parent in $data').column('name'))
        .then(function(parents) {
          var exist_parent = parents.length > 1;
          expect(exist_parent).toBe(false);
        });
      }, browser.timeout());
    });

  });


});
