'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

module.exports = (function() {

	return {

		initialize : function( options ) {
			this.options = options;

			gulp.task('sass', this._sassFunc.bind( this ));
			gulp.task('sass:watch', this._sassWatchFunc.bind( this ));

		},

		_sassFunc : function() {
			return gulp.src( this.options.src )
					.pipe( sass().on( 'error', sass.logError ) )
					.pipe( gulp.dest( this.options.dest ) )
					.pipe(livereload());
		},

		_sassWatchFunc : function() {
			gulp.watch( this.options.src, ['sass'] );
		}

	}

}());