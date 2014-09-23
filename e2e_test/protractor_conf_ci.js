'use strict';

var config = require('./protractorConf.js');

config.seleniumServerJar = __dirname+'/selenium.jar';
config.allScriptsTimeout = 500000;
config.baseUrl = 'http://localhost:3001';

delete config.seleniumAddress;

module.exports = config;