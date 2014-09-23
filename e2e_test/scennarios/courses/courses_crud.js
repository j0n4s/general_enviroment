'use strict';

require('selenium-webdriver');
var app = require('../app.js');
var _ = require('underscore');

describe('Courses CRUD', function() {

	var new_course = {
		'course.subject' : 'Lengua',
    'course.name' : 'Francés',
		'course.reference_name' : 'Primero de Básica, Educacion General Basica',
		'course.code' : 'IN-2B',
		'course.teacher' : 'James',
    'course.grade' : 'Primero de Básica'
	};

	var course_tab_student = {
		'filters.grade' : 'Segundo de Básica'
	};

	var course_tab_schdule = {
		'session.day' : 'Martes',
		'session.start' : '09:00',
		'session.end' : '10:00'
	};

	var empty_fields = {
    'course.name' : ' ',
		'course.reference_name' : ' ',
		'course.code' : ' '
	};

	var student_data = [{
    'nombre' : 'Remy  LeBeau',
		'cedula' : '0500972062'
	}, {
		'nombre' : 'Anna  Marie',
		'cedula' : '1715378103'
	}, {
		'nombre' : 'Kurt  Wagner',
		'cedula' : '0400606844'
	}];

	it('Should add class ng-invalid-required for required field', function() {
		app.auth.login_as_teacher().then(function() {
			app.years.change('2013-2014');
			app.courses.list();
			app.courses.creation_form();
			app.form.fill(empty_fields);
			_(empty_fields).each(function(value, key) {
				element(by.model(key)).getAttribute('class')
				.then(function(ng_invalid_class) {
					expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
				});
			});

		});
	}, browser.timeout());

	it('Should add error message "El campo es requerido!"', function() {
		var tag;
    app.form.fill(empty_fields);
		_(empty_fields).each(function(value, key) {
			tag = key.replace('.', '_');
			expect(element(by.id(tag + '_error')).getText()).toEqual('El campo es requerido!');
		});

	}, browser.timeout());

	describe('When the course is created appropriately', function() {
		it('Should redirect to course list, and add student at course', function() {
			app.form.fill(new_course);
			app.courses.change_tab('tab-students');
			app.form.fill(course_tab_student);
			app.courses.select_student(student_data);
			app.courses.change_tab('tab-schedule');
			app.courses.add_schdule();
			app.form.fill(course_tab_schdule);
			app.form.submit();
		}, browser.timeout());

		it('Should  search and display the course created', function() {
			app.courses.search('Francés');
      expect(element(by.binding('course.name')).getText()).toBe('Francés');
      expect(element(by.binding('course.reference_name')).getText()).toBe('Primero de Básica, Educacion General Basica');
		}, browser.timeout());

    it('Should  have the correct defaults', function() {
      app.courses.edit('Francés');
      expect(element(by.model('course.weight_in_subject')).getAttribute('value')).toBe('100');
    }, browser.timeout());
	});



	describe('Editing a course', function() {

		describe('When the course is updated appropriately', function() {

			it('Should redirect to course list', function() {
				app.courses.list();
				app.courses.edit('Francés');
				app.form.fill({
					'course.name' : ' ',
					'course.grade' : ' '
				});
				app.form.submit();
				element(by.model('course.name')).getAttribute('class')
				.then(function(ng_invalid_class) {
					expect(ng_invalid_class.indexOf('ng-invalid-required') !== -1).toBe(true);
				});
			}, browser.timeout());

			it('should display the course updated', function() {
				app.form.fill({
          'course.name' : 'Francés Basico',
					'course.weight_in_subject' : 22,
				});
				app.form.submit();
				app.courses.search('Francés Basico');
				expect(element(by.binding('course.name')).getText()).toBe('Francés Basico');
      expect(element(by.binding('course.reference_name')).getText()).toBe('Primero de Básica, Educacion General Basica');
        app.courses.edit('Francés Basico');
        expect(element(by.model('course.weight_in_subject')).getAttribute('value')).toBe('22');
        app.form.submit();
			}, browser.timeout());
		});
	});

	describe('Delete course', function() {

        describe('When course belongs to a activities or exams', function() {

          it('should show a modal with error message and result', function () {
            browser.driver.manage().timeouts().implicitlyWait(1000);
            app.courses.delete('Arte Ceramica');
            app.form.submit('[data-bb-handler="confirm"]');
            browser.sleep(400);
            expect(element(by.css('.bootbox.modal')).getText()).toContain('No se pudo eliminar la clase');
            expect(element(by.css('.bootbox.modal')).getText()).toContain('actividades');
            expect(element(by.css('.bootbox.modal')).getText()).toContain('exámenes de período');
            app.form.submit('[data-bb-handler="cancel"]');
          }, browser.timeout());
        });

        describe('when course doesn\'t have a activities or exams', function() {
          it('should delete the course', function() {
            app.courses.delete('Francés Basico');
            app.form.submit('[data-bb-handler="confirm"]');
            element(by.css('#gritter-notice-wrapper'))
            .isPresent()
            .then(function(elem) {
              expect(elem).toEqual(true);
            });

          }, browser.timeout());
        });

      });

});
