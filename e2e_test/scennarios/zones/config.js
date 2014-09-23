var config = require('../../protractorConf');

config.specs = [
  __dirname+'/zones_crud.js',
];

exports.config = config;