var config = require('../../protractorConf');

config.specs = [
  __dirname+'/courses_crud.js',
  __dirname+'/courses_wizard.js'
];

exports.config = config;