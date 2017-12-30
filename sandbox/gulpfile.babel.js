import gulp from 'gulp';

// Plugins
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';

// Helpers
import del from 'del';
import lazypipe from 'lazypipe';

// Paths
const PATHS = {
	src: {
		js: 'src/js',
		scss: 'src/scss',
		images: 'src/images',
	},

	dest: {
		js: 'dist/js',
		css: 'dist/css',
		images: 'dist/images',
	},
};


//	Javascript
// ------------

gulp.task('convertJS', () => (
	gulp.src(`${PATHS.src.js}/**/*.js`)
		.pipe(babel())
		.pipe(gulp.dest(PATHS.dest.js))
));

gulp.task('watch:js', () => {
	gulp.watch(`${PATHS.src.js}/**/*.js`, ['convertJS']);
});

gulp.task('clean:js', () => del.sync(PATHS.dest.js));

gulp.task('build:js', ['clean:js'], () => (
	gulp.src(`${PATHS.src.js}/**/*.js`)
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(PATHS.dest.js))
));


//	SASS - CSS
// ------------

gulp.task('convertCSS', () => (
	gulp.src(`${PATHS.src.scss}/**/*.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(PATHS.dest.css))
));

gulp.task('watch:css', () => {
	gulp.watch(`${PATHS.src.scss}/**/*.scss`, ['convertCSS']);
});

gulp.task('clean:css', () => del.sync(PATHS.dest.css));

gulp.task('build:css', ['clean:css'], () => (
	gulp.src(`${PATHS.src.scss}/**/*.scss`)
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
		}).on('error', sass.logError))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(PATHS.dest.css))
));


//	Wrapping Up
// -------------

gulp.task('default', () => {}); // WIP

const watchTasks = [
	'watch:css',
	'watch:js',
];

gulp.task('watch', watchTasks);
gulp.task('watch:all', watchTasks);

const cleanTasks = [
	'clean:css',
	'clean:js',
];

gulp.task('clean', cleanTasks);
gulp.task('clean:all', cleanTasks);

const buildTasks = [
	'build:css',
	'build:js',
];

gulp.task('build', buildTasks);
gulp.task('build:all', buildTasks);
