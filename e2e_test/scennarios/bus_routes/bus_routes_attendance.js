'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

var filters = {
  'filters.year': '2014',
  'filters.month': 'Septiembre'
};

describe('Bus routes attendance', function() {

  it('Should verify students in bus attendance', function() {

    app.bus_routes.list();
    app.bus_routes.search('Ruta Nueva Editada');
    app.form.do_action_if_visible('[href^="#/bus_attendance/"]','click');
    app.form.fill(filters);

    app.students.search('Wagner');
    expect(element(by.binding('address.student')).getText()).toBe('Wagner Nightcrawler, Kurt');

  }, browser.timeout());

  it('Should verify correctly trips students in entry route bus attendance', function() {

    element.all(by.css('td[ng-repeat="column in columns"] span i'))
    .then(function(elem){

      elem[0].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-right blue');
      });

      elem[1].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[2].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[3].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[4].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[5].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[6].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

    });

  }, browser.timeout());

  it('Should verify correctly trips students in exit route bus attendance', function() {

    app.form.do_action_if_visible('[ng-class="{ \'active\' : direction.from }"] a', 'click');

    element.all(by.css('td[ng-repeat="column in columns"] span i'))
    .then(function(elem){

      elem[0].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-left orange');
      });

      elem[1].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-left orange');
      });

      elem[2].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-left orange');
      });

      elem[3].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-left orange');
      });

      elem[4].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-long-arrow-left orange');
      });

      elem[5].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

      elem[6].getAttribute('class').then(function(attr){
        expect(attr).toBe('icon-ban-circle light-grey');
      });

    });

  }, browser.timeout())
});