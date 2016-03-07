var gulp = require('gulp');

// Require in additional recipes that will push new tasks to gulp
var browserifyRecipe = require('./gulp-recipes/browserify');
var sassRecipe = require('./gulp-recipes/sass');
var livereloadStart = require('./gulp-recipes/livereload-start');

// Set some options for recipes here
browserifyRecipe.initialize({
	entries : ['./src/js/main.js'],
	debug : true
}, {
	dest : './public/scripts',
	fileName : 'main.built.js',
	loadMaps : true
});

sassRecipe.initialize({
	src : './src/scss/**/*.scss',
	dest : './public/styles'
});

livereloadStart.initialize();

gulp.task('default', [ 'browserify', 'sass'  ]);
gulp.task('dev', [ 'livereload-start', 'watchify', 'sass', 'sass:watch' ]);