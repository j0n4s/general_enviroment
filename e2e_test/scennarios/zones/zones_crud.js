'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('zones CRUD', function() {

  var new_zone = {
    'city_zone.name' : 'Zona Nueva',
    'city_zone.description' : 'Zona nueva cerca de Guapulo'
  };

  var empty_fields = {
    'city_zone.name' : '',
    'city_zone.description' : ''
  };

  it('Should add zones ng-invalid-required for required field', function() {
    app.auth.login_as_admin()
    .then(function() {
      app.years.change('2013-2014');
      app.zones.list();
      app.form.fill(empty_fields);
      app.form.submit();

      element(by.model('city_zone.name')).getAttribute('class')
      .then(function(ng_invalid_class) {
        expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
      });
    });
  }, browser.timeout());

  describe('When the zone is created appropriately', function() {
    it('Should redirect to zone list', function() {
      app.form.fill(new_zone);
      app.form.submit();
    }, browser.timeout());

    it('Should the search, add display the zone created', function() {
      app.zones.search('Zona Nueva');
      expect(element(by.binding('city_zone.name')).getText()).toBe('Zona Nueva');
    }, browser.timeout());
  });

  describe('Editing a zone', function() {

    describe('When the zone is updated appropriately', function() {

      it('Should redirect to zone list', function() {
        app.zones.list();
        app.zones.edit('Zona Nueva');
        app.form.fill({
          'city_zone.name' : '',
          'city_zone.description' : ''
        });
        app.form.submit();

        element(by.model('city_zone.name')).getAttribute('class')
        .then(function(ng_invalid_class) {
          console.log(ng_invalid_class);
          expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
        });
      }, browser.timeout());

      it('should display the zone updated', function() {
        app.form.fill({
          'city_zone.name' : 'Zona Nueva 1',
          'city_zone.description' : 'Zona nueva cerca de Guapulo1'
        });
        app.form.submit();
        app.zones.search('Zona Nueva 1');
        expect(element(by.binding('city_zone.name')).getText()).toBe('Zona Nueva 1');

      }, browser.timeout());
    });
  });

});
