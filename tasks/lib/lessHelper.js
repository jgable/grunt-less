"use strict";

var fs = require("fs"),
	path = require("path");

var Parser = require("less").Parser;

var grunt = require("grunt"),
	async = grunt.util.async,
	linefeed = grunt.util.linefeed,
	verbose = grunt.verbose;

module.exports = function(srcFiles, options, callback) {
	var compileLESSFile = function(src, callback) {
      var parser = new Parser({
        paths: [path.dirname(src)]
      });

      // read source file
      fs.readFile(src, 'utf8', function(err, data) {
        if (err) {
          return callback(err);
        }

        // send data from source file to LESS parser to get CSS
        verbose.writeln('Parsing ' + src);
        parser.parse(data, function(err, tree) {
          if (err) {
            return callback(err);
          }

          var css = null;
          try {
            css = tree.toCSS({
              compress: options.compress,
              yuicompress: options.yuicompress
            });
          } catch(e) {
            callback(e);
            return;
          }

          callback(null, css);
        });
      });
    };

    async.map(srcFiles, compileLESSFile, function(err, results) {
      if (err) {
        return callback(err);
      }
     
      callback(null, results.join(linefeed));
    });
};