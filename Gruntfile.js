'use strict';

module.exports = function(grunt)
{
  // Show elapsed time at the end
  require('time-grunt')(grunt);

  // Load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-typescript');

  // Project configuration.
  grunt.initConfig(
  {
    clean:
    {
      lib: ['lib/haeckel.d.ts', 'lib/*.js', 'lib/**/*.js']
    },
    nodeunit:
    {
      files: ['test/**/*_test.js']
    },
    replace:
    {
      lib:
      {
        src: ['lib/haeckel.d.ts'],
        dest: 'lib/',
        replacements: [
          { from: /\s+extends\s+([^{[(]+)\[\]/g, to: " extends Array<$1>" },
          { from: '/// <reference path="../bower_components/dt-node/node.d.ts" />', to: "" }
        ]
      }
    },
    typescript:
    {
      lib:
      {
        src: [ 'lib/**/*.ts' ],
        dest: 'lib/haeckel.js',
        options: 
        {
          target: 'es5',
          base_path: 'lib',
          declaration: true,
          module: "commonjs",
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
          module: "commonjs",
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
        tasks: ['clean:lib', 'typescript:lib', 'nodeunit']
      },
      test:
      {
        files: 'test/**/*.ts',
        tasks: ['typescript:test', 'nodeunit']
      }
    }
  });

  // Default task.
  grunt.registerTask('lib', ['clean:lib', 'typescript:lib', 'replace:lib']);

  grunt.registerTask('test', ['lib', 'typescript:test', 'nodeunit']);

  grunt.registerTask('default', ['lib']); // :TODO: change back to ['test']
};
