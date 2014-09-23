var protractor = require('protractor');
require('./node_modules/protractor/jasminewd');
jasmine.getEnv().defaultTimeoutInterval = 20000;
module.exports = protractor;
