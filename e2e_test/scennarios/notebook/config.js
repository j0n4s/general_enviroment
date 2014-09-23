var config = require('../../protractorConf');

config.specs = [
  __dirname+'/attendance.js',
  __dirname+'/scores.js',
  __dirname+'/conduct_notes.js',
  __dirname+'/comments.js'
];

exports.config = config;
