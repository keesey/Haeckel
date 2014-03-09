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
      bin: ['bin/**/*']
    },
    replace:
    {
      lib:
      {
        src: ['bin/haeckel.d.ts'],
        dest: 'bin/',
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
        src: [ 'src/lib/**/*.ts' ],
        dest: 'bin/haeckel.js',
        options: 
        {
          target: 'es5',
          base_path: 'src/lib',
          declaration: true,
          sourcemap: false,
          noImplicitAny: true
        }
      },
      phantom:
      {
        src: [ 'src/phantom.ts' ],
        dest: 'bin/phantom.js',
        options: 
        {
          target: 'es5',
          base_path: 'src',
          declaration: false,
          sourcemap: false,
          noImplicitAny: true
        }
      },
    },
    watch:
    {
      lib:
      {
        files: 'src/lib/**/*.ts',
        tasks: ['lib']
      }
    }
  });

  // Default task.
  grunt.registerTask('lib', ['typescript:lib', 'replace:lib']);

  grunt.registerTask('exec', ['lib', 'typescript:phantom']);

  //grunt.registerTask('test', ['lib', 'typescript:test', 'nodeunit']);

  grunt.registerTask('default', ['exec']); // :TODO: change back to ['test']
};
