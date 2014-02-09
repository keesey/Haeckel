'use strict';

module.exports = function(grunt)
{
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-typescript');

  // Project configuration.
  grunt.initConfig(
  {
    nodeunit:
    {
      files: ['test/**/*_test.js']
    },
    typescript:
    {
      lib:
      {
        src: ['lib/**/*.ts'],
        dest: 'lib/haeckel.js',
        options: 
        {
          target: 'es5',
          base_path: 'lib',
          declaration: true,
          sourcemap: false,
          noImplicitAny: true
        }
      },
      test:
      {
        src: ['test/**/*.ts'],
        dest: 'test',
        options: 
        {
          target: 'es5',
          base_path: 'test',
          declaration: false,
          sourcemap: true,
          noImplicitAny: true
        }
      }
    },
    watch:
    {
      lib:
      {
        files: 'lib/**/*.ts',
        tasks: ['typescript:lib', 'nodeunit']
      },
      test:
      {
        files: 'test/**/*.ts',
        tasks: ['typescript:test', 'nodeunit']
      }
    }
  });

  // Default task.
  grunt.registerTask('test', ['typescript', 'nodeunit']);

  grunt.registerTask('default', ['test']);
};
