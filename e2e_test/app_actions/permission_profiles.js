'use strict';

var _ = require('underscore');
var Q = require('q');

module.exports = {
  list: function() {
    element(by.css('ul.nav [href="#/permissions_profiles"]')).click();
  },
  edit_teacher_profile: function() {
    this.list();
    element(by.css('a[href="#/profile_permissions/edit/53a0a866fc09c1392c4a0210"]')).click();
  },
  
  edit_admin_profile: function() {
    this.list();
    element(by.css('a[href="#/profile_permissions/edit/53a0a866fc09c1392c4a020c"]')).click();
  },
  courses_tab: function() {
    return element(by.css('a[data-target="#tab-route-2"]')).click();
  },
  empty_permissions: function(container) {
    return element.all(by.css(container + ' [ng-model="permission.allowed"]'))
    .then(function(inputs) {
      var promises = [];
      _(inputs).each(function(input) {
        promises.push(input.isSelected()
        .then(function(selected) {
          if (selected) {
            return input.click();
          }
        }));
      });
      return Q.all(promises);
    });
  },
  check_admin_all: function(container) {
    element.all(by.css(container + ' [ng-model="permission.allowed"]'))
    .then(function(element){
      element.click();
    });
  },
  check_admin_attendance: function() {
    element.all(by.css('#tab-route-2 [ng-model="permission.allowed"]'))
    .get(1).click();
  },
  check_admin_scores: function() {
    element.all(by.css('#tab-route-2 [ng-model="permission.allowed"]'))
    .get(3).click();
  },
  check_admin_comments: function() {
    element.all(by.css('#tab-route-2 [ng-model="permission.allowed"]'))
    .get(5).click();
  },
  check_admin_conduct_notes: function() {
    element.all(by.css('#tab-route-2 [ng-model="permission.allowed"]'))
    .get(7).click();
  },
  check_admin_conduct_scores: function() {
    element.all(by.css('#tab-route-2 [ng-model="permission.allowed"]'))
    .get(9).click();
  }
  
  

};

