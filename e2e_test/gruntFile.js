'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shell-spawn');
  grunt.loadNpmTasks('grunt-protractor-runner');


  // Project configuration.
  grunt.initConfig({
    shell: {
      options: { stdout: true, stderr: true, failOnError: true },
      prepare_client: {
        options: { stdout: false },
        command: 'cd ../client/;grunt jslinker:e2e;cd ../e2e_test'
      },
      start_app: {
        options: { stdout: true },
        command: 'cd ../server/;node app.js e2e_testing;cd ../e2e_test'
      },
      start_selenium: {
        options: { stdout: true },
        command: 'webdriver-manager start'
      },
      update_selenium: {
        options: { stdout: true },
        command: 'webdriver-manager update'
      },
      mock_mailer: {
        options: { stdout: true },
        command: 'export MAILER=false'
      },
      unmock_mailer: {
        options: { stdout: true },
        command: 'unset MAILER'
      },
      server_fixtures: {
        options: { stdout: false },
        command: 'cd ../server/;grunt e2e_fixtures;cd ../e2e_test'
      },
      client_to_default: {
        options: { stdout: false },
        command: 'cd ../client/;grunt jslinker:default;cd ../e2e_test'
      },
      get_selenium: {
        options: {failOnError: false },
        command: 'sh ./get_selenium_server.sh'
      }
    },
    express: {
      options: {
        //output: '',
      },
      dev: {
        options: {
          script: '../server/app.js',
          port:3001,
          args: ['e2e_testing']
        }
      },
    },
    jshint: {
      files: ['gruntFile.js', 'scennarios/**.js', 'app_actions/**.js'],
      options: {
        jshintrc: '../.jshintrc',
      }
    },
    protractor: {
      e2e:{
        options: {
          configFile: 'protractorConf.js', // Default config file
          keepAlive: false, // If false, the grunt process stops when the test fails.
          noColor: false, // If true, protractor will not use colors in its output.
          args:{
            suite: '<%=scennario%>'
          }
        }
      },
      ci:{
        options: {
          configFile: 'protractorConf.js', // Default config file
          keepAlive: false, // If false, the grunt process stops when the test fails.
          args:{
            suite: '<%=scennario%>'
          }
        }
      }
    }
  });

  grunt.registerTask('test', function(scennario) {
    grunt.config.set('scennario', scennario);
    grunt.task.run([
      'jshint',
      'shell:mock_mailer',
      'shell:get_selenium',
      'shell:server_fixtures',
      'shell:prepare_client',
      'express',
      'shell:client_to_default',
      'shell:unmock_mailer',
      'protractor:e2e'
    ]);
  });

  grunt.registerTask('selenium', ['shell:update_selenium', 'shell:start_selenium']);
  grunt.registerTask('start_app', ['shell:start_app']);

  grunt.registerTask('ci', function() {
    grunt.task.run([
      'jshint',
      'shell:mock_mailer',
      'shell:get_selenium',
      'shell:server_fixtures',
      'shell:prepare_client',
      'express',
      'shell:client_to_default',
      'shell:unmock_mailer',
      'protractor:ci'
    ]);
  });

  // Default task.
  grunt.registerTask('default', 'test');


  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

};

