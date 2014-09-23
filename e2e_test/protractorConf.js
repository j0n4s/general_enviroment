'use strict';
// An example configuration file.
exports.config = {
  // seleniumServerJar and seleniumPort will be ignored.
  //seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: __dirname+'/selenium.jar',
  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:3001',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'firefox'
  },

  suites: {
    courses: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/courses/**/*.js'],
    login: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/login/**/*.js'],
    notebook: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/notebook/**/*.js'],
    parents: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/parents/**/*.js'],
    staff: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/staff/**/*.js'],
    students: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/students/**/*.js'],
    subjects: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/subjects/**/*.js'],
    zones: [__dirname+'/app_actions/**/*.js',__dirname+'/scennarios/zones/**/*.js'],
    bus_routes: [ __dirname+'/app_actions/**/*.js', 
                 __dirname+'/scennarios/bus_routes/bus_routes_crud.js', 
                 __dirname+'/scennarios/bus_routes/bus_routes_passengers.js', 
                 __dirname+'/scennarios/bus_routes/bus_routes_attendance.js'
                ],
    students_by_zones: [__dirname+'/app_actions/**/*.js', __dirname+'/scennarios/students_by_zones/**/*.js']
  },

  framework: 'jasmine',

  onPrepare: function() {
    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };

    require('jasmine-reporters');
    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    browser.timeout = function() {
      return 500000
    };

    jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter('junit_reports/', true, true));
  },
  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    isVerbose: true,
    showColors: true,
    includeStackTrace: true
  },

  allScriptsTimeout: 500000
};
