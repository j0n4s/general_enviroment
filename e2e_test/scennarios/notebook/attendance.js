'use strict';

require('selenium-webdriver');
var app = require('../app.js');

describe('Attendance tab control', function() {

  var new_class_date = {
    'new_class_date.part': 'Primer parcial',
    'new_class_date.description': 'Esta es la primera parcial'
  };

  var attendance_modal_notes = {
    'attendance_modal.attendance.notes': 'Siempre llega tarde por alguna razon'
  };

  it('Should login, insert new date attendance and change attendance on student ', function() {
    app.auth.login_as_admin()
    .then(function() {
      app.permission_profiles.edit_teacher_profile();
      app.permission_profiles.courses_tab();
      app.permission_profiles.empty_permissions('#tab-route-2');
      app.permission_profiles.check_admin_attendance();
      app.form.submit('button[ng-click="update()"]');
      return app.auth.logout();
    })
    .then(function() {
      return app.auth.login_as_teacher();
    })
    .then(function() {
      browser.driver.manage().timeouts().implicitlyWait(1000);
      app.my_courses.list();
      app.years.change('2013-2014');
      app.my_courses.edit_first();
      app.my_courses.add_new_class_date(new_class_date);
      app.form.submit('form[ng-submit="add_class_date()"] button[type="submit"]');

      app.my_courses.add_attendance_student();
      element.all(by.css('[ng-click^="($parent.on_place_edit !== date"]>span i'))
      .get(0).getAttribute('class')
      .then(function(attendance) {
        expect(attendance.indexOf('icon-minus-sign') !== -1).toBe(true);
      });

      app.my_courses.add_attendance_complete_student(attendance_modal_notes);
      element.all(by.css('[ng-click^="($parent.on_place_edit !== date"]>span i'))
      .get(2).getAttribute('class')
      .then(function(attendance) {
        expect(attendance.indexOf('icon-late') !== -1).toBe(true);
      });

      app.form.submit('button[id="save_attendance_modal"]');
      app.form.submit('button[ng-click="update()"]');
      app.my_courses.list();
      app.my_courses.edit_first();

    })
    .then(function() {
      return app.auth.login_as_teacher();
    });
  }, browser.timeout());

});
