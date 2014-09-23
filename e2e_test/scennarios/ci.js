'use strict';

var grunt = require('grunt');
var configs = grunt.file.expand(__dirname+'/*/config.js');

var specs = [];

configs.forEach(function(path) {
  specs = specs.concat(require(path).config.specs);
});

var config = require('../protractor_conf_ci.js');

config.specs = specs;

exports.config = config;
