'use strict';

require('selenium-webdriver');
var app = require('../app.js');

describe('Courses notebook: conduct_notes', function() {

  var new_conduct_note = {
    'form_conduct_note.note.date' : '12/05/2014',
    'form_conduct_note.note.highlighted' : true,
    'form_conduct_note.note.good_behavior' : true,
    'form_conduct_note.note.comment' : 'test comment'
  };

  describe('when giving permissions to profesor only for conduct notes', function() {
    it('should have access to conduct_notes tab and should can create new conduct notes', function() {
      app.auth.login_as_admin().then(function() {
        app.permission_profiles.edit_teacher_profile();
        app.permission_profiles.courses_tab();
        return app.permission_profiles.empty_permissions('#tab-route-2');
      })
      .then(function() {
        app.permission_profiles.check_admin_conduct_notes();
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
        app.my_courses.search_student_on_conduct_view('Wagner');        
        app.my_courses.add_new_conduct_note(new_conduct_note);        
        app.form.submit();
        return app.my_courses.list();
      })
      .then(function() {
        app.my_courses.edit_first();
        return app.my_courses.get_conduct_scores_for('Wagner');
      })
      .then(function(conduct_notes) {
        expect(conduct_notes.length).toBe(3);
      });

    }, browser.timeout());
  });

  describe('when giving permissions to profesor for conduct scores', function() {
    it('should have permission to modify conduct scores for each student', function() {
      app.auth.login_as_admin().then(function() {
        app.permission_profiles.edit_teacher_profile();
        return app.permission_profiles.courses_tab();
      })
      .then(function() {
        app.permission_profiles.check_admin_conduct_scores();
        app.form.submit('button[ng-click="update()"]');
        return app.auth.logout();
      })
      .then(function() {
        return app.auth.login_as_teacher();
      })
      .then(function() {
        app.my_courses.list();
        app.my_courses.edit_first();
        app.my_courses.update_conduct_score_for('Wagner', 7);

        app.my_courses.list();
        app.my_courses.edit_first();
        app.my_courses.search_student_on_conduct_view('Wagner');

        return element(by.css('.infobox-score-number span')).getText();
      })
      .then(function(score) {
        expect(score).toBe('7');
      });
    }, browser.timeout());
  });

});
