'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Create course with wizard', function() {

  var default_teacher = {
    'grade.default_teacher' : 'Kent'
  };

  var select_teacher = {
    'subject.teacher' : 'Kent'
  };

  it('Should select subjects in tab basic elementary, unified school and check create courses', function() {
    app.auth.login_as_teacher().then(function() {
      app.years.change('2013-2014');
      app.courses.list();
      app.courses.wizard_create();
      app.courses.select_teacher('grade.default_teacher', 0, 'Kent', '#grade_teacher__0_0');
      app.courses.select_subjects(['Lengua', 'Dibujo'], 's0_c0');
      app.courses.change_tab_wizard(1);
      app.courses.select_teacher('grade.default_teacher', 0, 'Kent', '#grade_teacher__0_1');
      app.courses.select_subjects(['Matemáticas', 'Música'], 's0_c1');
      app.courses.change_tab_wizard(2);
      app.form.submit('[data-last]');
      app.form.submit('[data-last]');

      app.courses.search('Lengua');
      element.all(by.repeater('course in $data').column('subject'))
      .then(function(subjects) {
        var exist_subjects = subjects.length > 1;
        expect(exist_subjects).toBe(true);
        _(subjects).each(function(subject) {
          subject.getText().then(function(subjects) {
            expect(subjects).toBe('Lengua');
          });
        });
      });

      app.courses.search('Matemáticas');
      element.all(by.repeater('course in $data').column('subject'))
      .then(function(subjects) {
        var exist_subjects = subjects.length > 1;
        expect(exist_subjects).toBe(true);
        _(subjects).each(function(subject) {
          subject.getText().then(function(subjects) {
            expect(subjects).toBe('Matemáticas');
          });
        });
      });

      app.courses.search('Música');
      element.all(by.repeater('course in $data').column('subject'))
      .then(function(subjects) {
        var exist_subjects = subjects.length > 1;
        expect(exist_subjects).toBe(true);
        _(subjects).each(function(subject) {
          subject.getText().then(function(subjects) {
            expect(subjects).toBe('Música');
          });
        });
      });

      return app.auth.logout();
    });
  }, browser.timeout());
});
