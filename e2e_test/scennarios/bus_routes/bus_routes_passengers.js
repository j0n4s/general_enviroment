'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

var quick_form_student1 = {
  'filters.city_zone': 'Zona dos',
  'student_quick_add.student': 'Marie'
}

var quick_form_student2 = {
  'filters.city_zone': 'Zona Uno',
  'student_quick_add.student': 'Wagner'
}

describe('Bus routes passenger', function() {

  it('Should add student in selected bus routes', function() {

    app.years.change('2013-2014');
    app.bus_routes.list();
    app.bus_routes.search('Ruta Nueva Editada');
    app.form.do_action_if_visible('[href^="#/bus_passengers/edit/"]','click');

    app.form.fill(quick_form_student1);
    app.form.submit();

    app.form.fill(quick_form_student2);
    app.form.submit();

    app.students.search('Marie');
    expect(element(by.binding('passenger.user.surname')).getText()).toBe('Marie Rogue, Anna');

    app.students.search('Wagner');    
    expect(element(by.binding('passenger.user.surname')).getText()).toBe('Wagner Nightcrawler, Kurt');

  }, browser.timeout());

  it('Should add student in selected bus routes', function() {

    app.bus_routes.list();
    app.bus_routes.search('Ruta Nueva Editada');
    app.form.do_action_if_visible('[href^="#/bus_passengers/edit/"]','click')

    app.students.search('Marie');
    app.form.do_action_if_visible('[click-confirm="remove_passenger(passenger)"]','click');
    app.form.do_action_if_visible('[data-bb-handler="confirm"]','click');

    element.all(by.css('table tbody tr')).each(function(rows){
      rows.isDisplayed()
      .then(function(isVisible){
        expect(isVisible).toBe(false);
      });
    });

  }, browser.timeout());
});