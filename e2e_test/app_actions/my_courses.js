'use strict';
var form = require('./form.js');
module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/teacher_courses"]')).click();
  },
  edit_first : function() {
    element.all(by.css('[href^="#/course_notebook"]')).get(1).click();
  },
  add_new_class_date : function(new_class_date) {
    element.all(by.css('[data-target="#new_class_date_modal"]')).get(0).click();
    form.fill(new_class_date);
  },
  add_attendance_student : function() {
    element(by.css('[ng-click^="($parent.on_place_edit !== date"]')).click();
    element.all(by.css('[ng-click^="($parent.on_place_edit !== date"]')).get(1).click();
    element(by.css('[ng-click^="($parent.on_place_edit !== date"]')).click();
  },
  add_attendance_complete_student : function(attendance_modal_notes) {
    element.all(by.css('[ng-click^="($parent.on_place_edit !== date)"]')).get(2).click();
    form.fill(attendance_modal_notes);
    element.all(by.css('[ng-model="attendance_modal.attendance.attended"]')).get(1).click();
  },
  add_new_activity_score : function(new_activity) {
    element.all(by.css('[ng-click="create_activity_modal()"]')).get(0).click();
    form.fill(new_activity);
  },
  edit_activity_score : function(new_activity, student_score) {
    element(by.xpath('//a[contains(text(), "' + new_activity + '")]/following::div/ul/li[1]["ng-click"]/i/..')).click();
    form.fill(student_score);
    element(by.xpath('//a[contains(text(), "' + new_activity + '")]/following::div/ul/li[1]["ng-click"]/i/..')).click();
  },
  add_new_comments : function(period_comments) {
    form.fill(period_comments);
  },
  add_new_conduct_note : function(notes) {
    element.all(by.css('[data-target="#conduct_notes_form"]')).get(0).click();
    form.fill(notes);
  },
  search_student_on_conduct_view : function(student) {
    element(by.css('input[ng-model="search.text"]')).sendKeys(student);
  },
  get_conduct_scores_for : function(student) {
    this.search_student_on_conduct_view(student);
    return element.all(by.css('.timeline-item'));
  },
  update_conduct_score_for : function(student, score) {
    this.search_student_on_conduct_view(student);
    element(by.css('a[data-target="#conduct_scores_form"]')).click();
    form.fill({
      'form_conduct_score.score' : score
    });
    form.submit('form[ng-submit^="update_conduct_score"] button[type=submit]');
  }
};
