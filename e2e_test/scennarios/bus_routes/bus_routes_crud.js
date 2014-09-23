'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Bus routes CRUD', function() {

  var bus_route_general = {
    'bus_route.name' : 'Ruta Nueva',
    'bus_route.plate_number' : 'C123',
    'bus_route.capacity' : '50',
    'bus_route.person_in_charge' : 'Jonathan Tinajero',
    'bus_route.description' : 'Ruta El Ejido',
  };

  var bus_route_driver = {
    'bus_route.driver.id_card' : '2222222222',
    'bus_route.driver.name' : 'Alonso',
    'bus_route.driver.surname' : 'Iturralde',
    'bus_route.driver.phone' : '222-2222',
  };

  var bus_route_general_empty_fields = {
    'bus_route.name' : '',
  };

  var bus_route_driver_empty_fields = {
    'bus_route.driver.id_card' : '',
    'bus_route.driver.name' : '',
    'bus_route.driver.surname' : '',
  };

  describe('When create bus route', function() {
    it('Should add bus_routes ng-invalid-required for required field', function() {
      app.auth.login_as_admin()
      .then(function() {
        app.years.change('2013-2014');
        app.bus_routes.list();
        app.bus_routes.create();

        app.bus_routes.tab_general();
        app.form.fill(bus_route_general_empty_fields);
        app.form.submit();

        element(by.model('bus_route.name')).getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });

        app.bus_routes.tab_driver();
        app.form.fill(bus_route_driver_empty_fields);
        app.form.submit();

        _(bus_route_driver_empty_fields).each(function(value, key) {
          element(by.model(key)).getAttribute('class')
          .then(function(ng_invalid_class) {
            expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
          });
        });
      });

    }, browser.timeout());

    it('should fill all fields and save correctly',function(){
      app.bus_routes.tab_general();
      app.form.fill(bus_route_general);

      app.bus_routes.tab_driver();
      app.form.fill(bus_route_driver);

      app.bus_routes.tab_trips();

      element.all(by.css('[ng-click="cycle_to_from(trip.week_day)"]'))
      .each(function(e){
        e.click();
      });

      element.all(by.css('[ng-click="cycle_to_from(trip.week_day)"]'))
      .then(function(e){
        e[0].click();
        e[1].click();
        e[1].click();
      });

      app.form.submit();
      app.bus_routes.search('Ruta Nueva');

      expect(element(by.binding('bus_route.name')).getText()).toBe('Ruta Nueva');
    }, browser.timeout());
  });

  describe('When edit bus route', function() {

    it('Should add bus_routes ng-invalid-required for required field', function() {

      app.bus_routes.list();
      app.bus_routes.edit('Ruta Nueva');

      app.bus_routes.tab_general();
      app.form.fill(bus_route_general_empty_fields);
      app.form.submit();

      element(by.model('bus_route.name')).getAttribute('class')
      .then(function(ng_invalid_class) {
        expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
      });

      app.bus_routes.tab_driver();
      app.form.fill(bus_route_driver_empty_fields);
      app.form.submit();

      _(bus_route_driver_empty_fields).each(function(value, key) {
        element(by.model(key)).getAttribute('class')
        .then(function(ng_invalid_class) {
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });
      });

    }, browser.timeout());

    it('should fill all fields and save correctly',function(){

      var bus_route_general_edit = {
        'bus_route.name' : 'Ruta Nueva Editada',
        'bus_route.plate_number' : 'C123',
        'bus_route.capacity' : '20',
        'bus_route.person_in_charge' : 'David Torroija',
        'bus_route.description' : 'Ruta Eloy Alfaro',
      };

      app.bus_routes.tab_general();
      app.form.fill(bus_route_general_edit);

      app.bus_routes.tab_driver();
      app.form.fill(bus_route_driver);

      app.bus_routes.tab_trips();

      element.all(by.css('[ng-click="cycle_to_from(trip.week_day)"]'))
      .each(function(e){
        e.click();
      });

      element.all(by.css('[ng-click="cycle_to_from(trip.week_day)"]'))
      .then(function(e){
        e[0].click();
        e[1].click();
        e[1].click();
      })

      app.form.submit();
      app.bus_routes.search('Ruta Nueva Editada');

      expect(element(by.binding('bus_route.name')).getText()).toBe('Ruta Nueva Editada');
    }, browser.timeout());
  });

});
