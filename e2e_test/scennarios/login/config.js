var config = require('../../protractorConf');

config.specs = [
  __dirname+'/login.js',
];

exports.config = config;
