'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Subjects CRUD', function() {

  var new_subject = {
    'subject.name' : 'Ciencias Sociales',
    'subject.abbreviation' : 'CCSS'
  };

  var empty_fields = {
    'subject.name' : '',
    'subject.abbreviation' : ''
  };

  it('Should add subjects ng-invalid-required for required field', function() {
    app.auth.login_as_teacher()
    .then(function() {
      app.years.change('2013-2014');
      app.subjects.list();
      app.form.fill(empty_fields);
      app.form.submit();

      _(empty_fields).each(function(value, key) {
        element(by.model(key)).getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });
      });      
    });
  }, browser.timeout());

  describe('When the subject is created appropriately', function() {
    it('Should redirect to subject list', function() {
      app.form.fill(new_subject);
      app.form.submit();
    }, browser.timeout());

    it('Should the search, add display the subject created', function() {
      app.subjects.search('Ciencias Sociales');
      expect(element(by.binding('subject.name')).getText()).toBe('Ciencias Sociales');
    }, browser.timeout());
  });

  describe('Editing a subject', function() {

    describe('When the subject is updated appropriately', function() {

      it('Should redirect to subject list', function() {
        app.subjects.list();
        app.subjects.edit('Ciencias Sociales');
        app.form.fill({
          'subject.name' : '',
          'subject.abbreviation' : ''
        });
        app.form.submit();

        element(by.model('subject.name')).getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });
      }, browser.timeout());

      it('should display the subject updated', function() {
        app.form.fill({
          'subject.name' : 'Ciencias Sociales 1',
          'subject.abbreviation' : 'CCSS1'
        });
        app.form.submit();
        app.subjects.search('Ciencias Sociales 1');
        expect(element(by.binding('subject.name')).getText()).toBe('Ciencias Sociales 1');

      }, browser.timeout());
    });
  });

  describe('Delete subject', function() {

    describe('When subject belongs to a class', function() {

      it('should display a modal with errors', function () {
        browser.driver.manage().timeouts().implicitlyWait(1000);
        app.subjects.delete('Matemáticas');
        app.form.submit('[data-bb-handler="confirm"]');
        browser.sleep(400);
        expect(element(by.css('.bootbox.modal')).getText()).toContain('No se pudo eliminar la asignatura');
        expect(element(by.css('.bootbox.modal')).getText()).toContain('clases');
        app.form.submit('[data-bb-handler="cancel"]');
      }, browser.timeout());

    });

    describe('when subject doesn\'t have a class and check the subject', function() {
      it('should delete the subject', function() {
        app.subjects.delete('Ciencias Sociales 1');
        app.form.submit('[data-bb-handler="confirm"]');
        element(by.css('#gritter-notice-wrapper'))
        .isPresent()
        .then(function(elem) {
          expect(elem).toEqual(true);
        });

        app.subjects.search('Ciencias Sociales 1');
        element.all(by.repeater('subject in $data').column('subject'))
        .then(function(subjects) {
          var exist_subjects = subjects.length > 1;
          expect(exist_subjects).toBe(false);
        });

      }, browser.timeout());
    });

  });

});
