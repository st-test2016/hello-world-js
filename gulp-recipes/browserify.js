'use strict';

var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var livereload = require('gulp-livereload');

module.exports = (function() {

    var watchifyInstance,
        inputOpts,
        watchifyInputOpts,
        outputOpts;

    return {

        initialize : function( inputOptions, outputOptions ) {
            // Save options
            inputOpts = inputOptions;
            outputOpts = outputOptions;

            // Set watchify options
            watchifyInputOpts = assign( {}, watchify.args, inputOpts );
            watchifyInstance = watchify( browserify( watchifyInputOpts ) ); 

            // add transformations here
            // i.e. b.transform(coffeeify);

            // Define tasks for a basic browserify
            gulp.task( 'browserify', this._browserifyFunc );

            // Define tasks for watchify
            gulp.task( 'watchify', this._watchifyFunc ); // so you can run `gulp js` to build the file
            watchifyInstance.on( 'update', this._watchifyFunc ); // on any dep update, runs the bundler
            watchifyInstance.on( 'log', gutil.log ); // output build logs to terminal
    
        },

        _browserifyFunc : function() {
            return browserify( inputOpts );
        },

        _watchifyFunc : function() {
            return watchifyInstance.bundle()
                // log errors if they happen
                .on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
                .pipe( source( outputOpts.fileName ) )
                // optional, remove if you don't need to buffer file contents
                .pipe( buffer() )
                // optional, remove if you dont want sourcemaps
                .pipe( sourcemaps.init({loadMaps : outputOpts.loadMaps })) // loads map from browserify file
                   // Add transformation tasks to the pipeline here.
                .pipe(sourcemaps.write('./')) // writes .map file
                .pipe(gulp.dest( outputOpts.dest ))
                .pipe(livereload());
        }

    }

}());