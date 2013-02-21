"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      all: ['GruntFile.js', 'tasks/**/*.js', 'test/**/*.js']
    },

    clean: {
      test: ['test/fixtures/output/*.css']
    },

    nodeunit: {
      all: ['test/less_test.js']
    },

    less: {
      test_no_compress: {
        src: 'test/fixtures/test.less',
        dest: 'test/fixtures/output/test.css'
      },
      test_compress: {
        src: 'test/fixtures/test.less',
        dest: 'test/fixtures/output/test_compress.css',
        options: {
          compress: true
        }
      },
      test_yuicompress: {
        src: 'test/fixtures/test.less',
        dest: 'test/fixtures/output/test_yuicompress.css',
        options: {
          yuicompress: true
        }
      }
    }

  });

  // Load Npm Tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', ['jshint']);

  // Testing
  // 1. Clean all the output .css files
  // 2. Compress the different less files
  // 3. Confirm the less file creation with nodeunit tests.
  grunt.registerTask('test', ['jshint:all', 'clean:test', 'less:test_no_compress', 'less:test_compress', 'less:test_yuicompress', 'nodeunit']);
};
