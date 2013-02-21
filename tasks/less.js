"use strict";

/*
 * grunt-less
 * https://github.com/jachardi/grunt-less
 *
 * Copyright (c) 2012 Jake Harding
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  // Grunt utilities.
  var task = grunt.task;
  var file = grunt.file;
  var utils = grunt.util;
  var log = grunt.log;
  var verbose = grunt.verbose;
  var fail = grunt.fail;
  var option = grunt.option;
  var config = grunt.config;
  var template = grunt.template;

  // external dependencies
  var fs = require('fs');
  var path = require('path');
  var less = require('less');
  var lessHelper = require("./lib/lessHelper");

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('less', 'Compile LESS files.', function() {
    var src = this.filesSrc;
    
    if (this.files.length < 1) {
      grunt.warn('Missing files');
      return false;
    }

    var dest = this.files[0].dest;
    var options = this.data.options || {};

    if (!src) {
      grunt.warn('Missing src property.');
      return false;
    }

    if (!dest) {
      grunt.warn('Missing dest property');
      return false;
    }

    var srcFiles = file.expand(src);

    var done = this.async();

    lessHelper(srcFiles, options, function(err, css) {
      if (err) {
        grunt.warn(err);
        done(false);
        
        return;
      }

      file.write(dest, css);
      done();
    });
  });
};
