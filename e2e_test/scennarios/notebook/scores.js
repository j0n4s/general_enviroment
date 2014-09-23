'use strict';

require('selenium-webdriver');
var app = require('../app.js');

describe('Score tab control ', function() {

  var new_activity = {
    'new_activity.activity_type': 'Grupal',
    'new_activity.name': 'Prueba',
    'new_activity.description': 'Lo q sea',
    'new_activity.date': '25/04/2014'
  };

  var student_score = {
    'score.score': '4'
  };

  it('Create activity, update score in new activity and check save student score', function() {
    app.auth.login_as_admin()
    .then(function() {

      app.permission_profiles.edit_teacher_profile();
      app.permission_profiles.courses_tab();
      app.permission_profiles.empty_permissions('#tab-route-2');
      app.permission_profiles.check_admin_scores();
      browser.sleep(500);
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
      app.my_courses.add_new_activity_score(new_activity);
      app.form.submit('form[ng-submit="add_activity()"] button[type="submit"]');
      app.my_courses.edit_activity_score(new_activity['new_activity.name'], student_score);
      app.form.submit('button[ng-click^="update()"]');
      app.my_courses.list();
      app.my_courses.edit_first();
      
    })
    .then(function() {
      return app.auth.login_as_teacher();
    });
  }, browser.timeout());

});
