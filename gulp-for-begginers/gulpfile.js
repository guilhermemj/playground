const gulp			= require('gulp');
const convertSass	= require('gulp-sass');
const browserSync	= require('browser-sync').create();
const useref		= require('gulp-useref');
const uglify		= require('gulp-uglify');
const gulpIf		= require('gulp-if');
const cssnano		= require('gulp-cssnano');
const imagemin		= require('gulp-imagemin');
const cache			= require('gulp-cache');
const del			= require('del');
const runInSequence	= require('run-sequence');

// Basic Gulp task syntax
gulp.task('hello', () => {
	console.log('Hello World!');
});


/*	Development Tasks
   =================== */

// Start browserSync server
gulp.task('browserSync', () => {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
	})
})

gulp.task('sass', () => {
	return gulp.src('app/scss/**/*.scss')
		.pipe(convertSass({outputStyle: 'compressed'}).on('error', convertSass.logError))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

// Watchers
gulp.task('watch', () => {
	gulp.watch('app/scss/**/*.scss', ['sass']);

	// Reloads the browser whenever HTML or JS files change
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});


/*	Optimization Tasks
   ==================== */

// Optimizing CSS and JavaScript 
gulp.task('useref', () => {
	return gulp.src('app/*.html')
		.pipe(useref())
		.pipe(gulpIf('*.js', uglify()))
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest('dist'));
});

// Optimizing Images 
gulp.task('images', () => {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(
			imagemin({ interlaced: true })
		))
		.pipe(gulp.dest('dist/images'));
});

// Copying fonts 
gulp.task('fonts', () => {
	return gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));
});

// Cleaning 
gulp.task('clean:dist', () => {
	return del.sync('dist');
});

gulp.task('cache:clear', (callback) => {
	return cache.clearAll(callback);
});


/*	Optimization Tasks
   ==================== */

gulp.task('default', (callback) => {
	runInSequence(
		['sass','browserSync'],
		'watch',
		callback,
	);
});

gulp.task('build', (callback) => {
	runInSequence(
		'clean:dist',
		['sass', 'useref', 'images', 'fonts'],
		callback,
	);
});