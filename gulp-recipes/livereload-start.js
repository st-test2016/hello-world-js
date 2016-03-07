var gulp = require('gulp');
var livereload = require('gulp-livereload');

module.exports = (function() {

	return {

		initialize : function() {

			gulp.task('livereload-start', this._livereloadFunc );

		},

		_livereloadFunc : function() {
			livereload.listen();
		}

	}

}());