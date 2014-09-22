'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-deployments');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {

      create_database:{
        command: 'sudo mysql -u root -h localhost -e "CREATE DATABASE IF NOT EXISTS db_testing DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;"',
      },

      load_fixtures: {
        command: 'sudo mysql < server_fixtures/db_testing.sql --database db_testing  -u root'
      },

      controllers: {
        options: {
          stdout: true
        },
        command: 'php vendor/bin/codecept run unit -c app/controllers/'
      },

      models: {
        options: {
          stdout: true
        },
        command: 'php vendor/bin/codecept run unit -c app/models/'
      }
    }
  });

  grunt.registerTask('preparate_database', [
    'shell:create_database',
    'shell:load_fixtures'
  ]);

  grunt.registerTask('run_test', [
    'shell:controllers',
    'shell:models'
  ]);

  grunt.registerTask('default', ['preparate_database', 'run_test']);
  grunt.registerTask('test', ['run_test']);
}



