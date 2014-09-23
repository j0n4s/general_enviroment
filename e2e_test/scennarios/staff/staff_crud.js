'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Staff CRUD', function() {

  var new_staff = {
    'staff_member.user.id_card': '1754337523',
    'staff_member.user.name': 'Robert',
    'staff_member.user.second_name': 'Louis',
    'staff_member.user.surname': 'Drake',
    'staff_member.user.second_surname': 'Drake',
    'staff_member.user.gender': 'M',
    'staff_member.user.email': 'iceman@xmen.com',
    'staff_member.user.address': 'Quito, Av. Amazonas',
    'staff_member.phone': '123456789',
    'staff_member.cell_phone': '369852147',
    'staff_member.biography': 'Capaz de convertir su cuerpo en hielo orgánico y congelar la humedad del ambiente',
    'staff_member.resume': 'Estudio x-men school'
  };

  var date_birthday = {
    'staff_member.user.birthday': '06/06/1972'
  };

  var job_positions = {
    'job_position.department' :'Contable',
    'job_position.position' :'Jefe Contador'
  };


  describe('When the user does not have permissions on staff', function() {
    it('should give full permissions on staff', function() {
      app.auth.login_as_admin()
      .then(function() {
        app.permission_profiles.edit_admin_profile();
        app.form.submit('button[ng-click="update()"]');
        return app.auth.logout();
      });
    }, browser.timeout());

  });
  describe('creating a staff', function() {

    var empty_fields = {
      'staff_member.user.id_card': ' ',
      'staff_member.user.name': ' ',
      'staff_member.user.surname': ' ',
      'staff_member.phone': ' '
    };

    describe('When a required fields is empty', function() {

      it('should add class ng-invalid-required for required field', function() {
        app.auth.login_as_admin()
        .then(function() {
          app.staff.creation_form();

          element(by.css('input.tt-input')).sendKeys('56787654567')
          app.form.submit('form button');

          app.form.fill(empty_fields);

          _(empty_fields).each(function(value, key) {

            element(by.model(key)).getAttribute('class').then(function(ng_invalid_class) {
              expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
            });
          });
        });

      }, browser.timeout());

      it('should add error message "El campo es requerido!"', function() {
        var tag;

        element.all(by.css('p.help-block'))
        .then(function(elements) {
          _(elements).each(function(element) {
            expect(element.getText()).toEqual('El campo es requerido!');
          });
        });

        //_(empty_fields).each(function(value, key) {
        //tag = key.replace('.', '_');
        //expect(element(by.id(tag + '_error')).getText()).toEqual('El campo es requerido!');
        //});

      }, browser.timeout());
    });

    describe('When the id_card is invalid and Pasport is unchecked', function() {

      it('should add class ng-invalid-invalid_id_card for id_card field', function() {

        app.form.fill({'staff_member.user.id_card': '1234567890'});

        element(by.model('staff_member.user.id_card')).getAttribute('class').then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-invalid_id_card') !== -1).toBe(true);
        });

      }, browser.timeout());

      it('should add error message "Cédula inválida!"', function() {

        expect(element(by.id('staff_member_id_card_error')).getText()).toEqual('Cédula inválida!');

      }, browser.timeout());
    });

    describe('When Pasport is checked', function() {

      it('should not add class ng-invalid-invalid_id_card for id_card field', function() {

        app.form.fill({'staff_member.user.id_card': '1234567890', 'staff_member.user.is_passport': 'yes'});

        element(by.model('staff_member.user.id_card')).getAttribute('class').then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-invalid_id_card') !== -1).toBe(false);
        });

      }, browser.timeout());
    });

    describe('When the email field is invalid', function() {

      it('should add class ng-invalid-email for email field', function() {

        app.form.fill({'staff_member.user.email': 'email@'});
        app.form.submit();

        element(by.model('staff_member.user.email')).getAttribute('class').then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-email') !== -1).toBe(true);
        });

      }, browser.timeout());

      it('should add error message "Debe ser un email válido!"', function() {

        expect(element(by.id('staff_member_email_error')).getText()).toEqual('Debe ser un email válido!');

      }, browser.timeout());
    });

    describe('When the staff is created appropriately', function() {
      it('should redirect to staff list, and display the staff created', function() {
        app.form.fill(date_birthday);
        app.form.fill(new_staff);
        app.staff.tab_job_positions();
        app.form.submit('[ng-click="add_job_position()"]');
        app.form.fill(job_positions);
        app.form.submit();

        app.staff.edit('Robert Louis');
        _(new_staff).each(function(value, key){
          element(by.model(key)).getAttribute('value')
          .then(function(text) {
            expect(text).toBe(value);
          });
        });

        app.staff.tab_job_positions();
        _(job_positions).each(function(value, key){
          element(by.model(key)).getAttribute('value')
          .then(function(text) {
            expect(text).toBe(value);
          });
        });

      }, browser.timeout());
    });

  });

  describe('Editing a staff', function() {

    describe('When a required field is empty', function() {

      it('should add class ng-invalid-required for required field', function() {

        app.staff.list();
        app.staff.edit('clark.kent@dailyplanet.ec');
        app.form.fill({'staff_member.user.name': ' '});
        app.staff.tab_job_positions();

        app.form.submit();

        element(by.model('staff_member.user.name'))
        .getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });

      }, browser.timeout());

      it('should add error message "El campo es requerido!"', function() {

        expect(element(by.id('staff_member_name_error')).getText()).toEqual('El campo es requerido!');

      }, browser.timeout());
    });

    describe('When the staff is updated appropriately', function() {

      it('should redirect to staff list, add display the staff updated', function() {
        app.staff.list();
        app.staff.edit('clark.kent@dailyplanet.ec');

        app.form.fill({ 'staff_member.user.second_surname': 'Superman' });
        app.form.fill({'staff_member.biography': 'jor El'});

        app.form.submit();

        app.staff.edit('clark.kent@dailyplanet.ec');

        element(by.model('staff_member.biography')).getAttribute('value')
        .then(function(value) {
          expect(value).toBe('jor El');
        });
        app.form.submit();
      }, browser.timeout());

      it('should save job_positions correctly and autocomplete it', function() {
        app.staff.list();
        app.staff.edit('clark.kent@dailyplanet.ec');
        app.staff.tab_job_positions();
        app.form.submit('[ng-click="add_job_position()"]');
        app.form.fill({'job_position.department' :'Cont'});
        browser.driver.manage().timeouts().implicitlyWait(1000);
        app.staff.select_autocomplete();
        app.form.fill({'job_position.position' :'Jefe Contador'});
        app.form.submit();

        app.staff.edit('clark.kent@dailyplanet.ec');
        app.staff.tab_job_positions();

        _(job_positions).each(function(value, key){
          element(by.model(key)).getAttribute('value')
          .then(function(text) {
            expect(text).toBe(value);
          });
        });

        app.form.submit();
      }, browser.timeout());

    });

  });

  describe('Delete staff', function() {

    describe('When deleting a staff', function() {

      it('should staff belongs to courses and groups', function() {
        app.staff.delete('wolverine@xmen.com');
        app.form.submit('[data-bb-handler="confirm"]');
        browser.sleep(300);
        expect(element(by.css('.bootbox.modal')).getText()).toContain('No se pudo eliminar el miembro');
        expect(element(by.css('.bootbox.modal')).getText()).toContain('Es profesor en');
        expect(element(by.css('.bootbox.modal')).getText()).toContain('Es tutor en');
        app.form.submit('[data-bb-handler="cancel"]');
      }, browser.timeout());

      it('should staff doesn\'t have a course and groups', function() {
        app.staff.delete(new_staff['staff_member.user.email']);
        app.form.submit('[data-bb-handler="confirm"]');
        element(by.css('#gritter-notice-wrapper'))
        .isPresent()
        .then(function(elem) {
          expect(elem).toEqual(true);
        });

      }, browser.timeout());
    });

  });
});
