'use strict';

require('selenium-webdriver');
var app = require('../app.js');

describe('Comments tab control', function() {

  var period_comments = {
    'period_comments.recommendation': 'Comentario de recomendacion del estudiante',
    'period_comments.improvement': 'Comentario de mejora del Estudiante'
  };

  it('Change comments and improvement a student and check save information', function() {
    app.auth.login_as_admin()
    .then(function() {
      app.permission_profiles.edit_teacher_profile();
      return app.permission_profiles.courses_tab();
    })
    .then(function() {
      return app.permission_profiles.empty_permissions('#tab-route-2');
    })
    .then(function() {
      app.permission_profiles.check_admin_comments();
      app.form.submit('button[ng-click="update()"]');
      return app.auth.logout();
    })
    .then(function() {
      return app.auth.login_as_teacher();
    })
    .then(function() {
      app.my_courses.list();
      app.years.change('2013-2014');
      app.my_courses.edit_first();
      app.my_courses.add_new_comments(period_comments);
      app.form.submit('button[ng-click="update()"]');
      app.my_courses.list();
      app.my_courses.edit_first();
    })
    .then(function() {
      return app.auth.login_as_teacher();
    });
  }, browser.timeout());
});
