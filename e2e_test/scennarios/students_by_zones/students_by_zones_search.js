'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('students in zones', function() {
  it('Should show students in assigned zone', function() {
    app.auth.login_as_admin()
    .then(function() {
      app.years.change('2013-2014');
      app.students_by_zones.list();
      app.students_by_zones.search('Zona Uno');
      expect(element(by.binding('city_zone.name')).getText()).toBe('2  Zona Uno');

      app.form.do_action_if_visible('[href^="#/students_by_zone/"]','click');

      expect(element(by.binding('city_zone.number_of_students')).getText()).toBe('2');

    });
  }, browser.timeout());

  it('Should not show students for a empty zone', function() {
    app.years.change('2013-2014');
    app.students_by_zones.list();
    app.students_by_zones.search('Zona cuatro');
    expect(element(by.binding('city_zone.name')).getText()).toBe('0  Zona cuatro');

    app.form.do_action_if_visible('[href^="#/students_by_zone/"]', 'click');
    expect(element(by.binding('city_zone.number_of_students')).getText()).toBe('0');
  });

  it('Should show students recently added to zone four', function() {
    app.students.list();
    app.students.edit('0301738852');
    app.students.tab_addresses();
    app.students.tab_zones();

    app.form.fill({
      'student.transport': true
    });

    app.form.submit();

    app.students_by_zones.list();
    app.students_by_zones.search('Zona cuatro');
    expect(element(by.binding('city_zone.name')).getText()).toBe('1  Zona cuatro');

    app.form.do_action_if_visible('[href^="#/students_by_zone/"]', 'click');
    expect(element(by.binding('city_zone.number_of_students')).getText()).toBe('1');

  })

});
