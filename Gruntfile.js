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
          basePath: 'src/lib',
          declaration: true,
          sourceMap: false,
          noImplicitAny: true
        }
      },
      render:
      {
        src: [ 'src/render.ts' ],
        dest: 'bin/render.js',
        options: 
        {
          target: 'es5',
          basePath: 'src',
          declaration: false,
          sourceMap: false,
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

  grunt.registerTask('build', ['lib', 'typescript:render']);

  //grunt.registerTask('test', ['lib', 'typescript:test', 'nodeunit']);

  grunt.registerTask('default', ['build']); // :TODO: change back to ['test']
};
