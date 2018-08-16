import gulp from 'gulp';
import notify from 'gulp-notify';
import nunjucks from 'gulp-nunjucks-render';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import plumber from 'gulp-plumber';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import del from 'del';
import browsersync from 'browser-sync';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

import { isDevEnv } from './node-env';
import serverConfig from './server-config';
import webpackConfig from './webpack.config';

const paths = {
	src: './src',
	dist: './dist',
	build: './build',
	css: '/css',
	scripts: {
		entry: './src/js/main.js'
	}
};

const handlePath = (defaultPath, additionalPath) => defaultPath + additionalPath;
const excludePath = (defaultPath, additionalPath) => '!' + handlePath(defaultPath, additionalPath);
const handleNodeEnvPath = (devPath, prodPath) => isDevEnv ? devPath : prodPath;

const handleError = err => {
	notify.onError({
		title: 'Gulp',
		subtitle: 'Failure!',
		message: 'Error: <%= error.message %>'
	})(err);

	this.emit('end');
};

gulp.task('browsersync', () => browsersync(serverConfig));

gulp.task('clean', async () => {
    del([paths.dist, paths.build], { force: true })
});

gulp.task('scripts', async () => {
    gulp.src(paths.scripts.entry)
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(handleNodeEnvPath(paths.dist, paths.build)))
});

gulp.task('html', async () => {
    gulp.src([handlePath(paths.src, '/views/**/*.html')])
    .pipe(nunjucks({
        path: [handlePath(paths.src, '/views')]
      }))
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(gulp.dest(handleNodeEnvPath(paths.dist, paths.build)))
});

gulp.task('sass', async () => {
    gulp.src([handlePath(paths.src, '/sass/**/*.scss')])
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(gulpif(isDevEnv, sourcemaps.init()))
    .pipe(sass({ outputStyle: isDevEnv ? 'compact' : 'compressed'}).on('error', handleError))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(gulpif(isDevEnv, sourcemaps.write()))
    .pipe(gulp.dest(handleNodeEnvPath(handlePath(paths.dist, paths.css), handlePath(paths.build, paths.css))))
});

gulp.task('images', async () => {
    gulp.src([handlePath(paths.src, '/images/**/*')])
    .pipe(gulpif(isDevEnv, imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			})
		]),
		imagemin([
			imagemin.gifsicle({
				interlaced: true
			}),
			imagemin.jpegtran({
				progressive: true
			}),
			imagemin.optipng({
				optimizationLevel: 5
			}),
			imagemin.svgo({
				plugins: [
					{ cleanupAttrs: true },
					{ removeDoctype: true },
					{ removeXMLProcInst: true },
					{ removeComments: true },
					{ removeMetadata: true },
					{ removeUselessDefs: true },
					{ removeEditorsNSData: true },
					{ removeEmptyAttrs: true },
					{ removeHiddenElems: false },
					{ removeEmptyText: true },
					{ removeEmptyContainers: true },
					{ cleanupEnableBackground: true },
					{ cleanupIDs: false },
					{ convertStyleToAttrs: true }
				]
			})
		])
    ))
    .pipe(gulp.dest(handleNodeEnvPath(handlePath(paths.dist, '/images'), handlePath(paths.build, '/images'))))
});

gulp.task('watch', async () => {
	gulp.watch(handlePath(paths.src, '/**/*.js'), gulp.series('scripts'));
	gulp.watch(handlePath(paths.src, '/views/**/*.html'), gulp.series('html'));
	gulp.watch(handlePath(paths.src, '/sass/**/*.scss'), gulp.series('sass'));
	gulp.watch(handlePath(paths.src, '/images/**/*'), gulp.series('images'));
});

gulp.task('build',
	gulp.series(
		'clean',
		'images',
		'sass',
		'html',
		'scripts'
	)
);

gulp.task('default',
	gulp.series(
		'clean',
		gulp.parallel(
			'images',
			'sass',
			'html',
			'scripts',
			'watch',
			'browsersync'
		)
	)
);
