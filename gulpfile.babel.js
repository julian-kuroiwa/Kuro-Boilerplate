import gulp from 'gulp';
import del from 'del';
import browsersync from 'browser-sync';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

import {isDevEnv} from './node-env';
import serverConfig from './server-config';
import webpackConfig from './webpack.config';

import gulpPlugins from 'gulp-load-plugins';

const plugins = gulpPlugins({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /\bgulp[\-.]/,
});

const paths = {
  src: './src',
  dev: './dev',
  build: './build',
  css: '/css',
  scripts: {
    entry: './src/js/main.js',
  },
};

const handlePath = (defaultPath, additionalPath) => (defaultPath + additionalPath);
const excludePath = (defaultPath, additionalPath) => `!${handlePath(defaultPath, additionalPath)}`;
const handleNodeEnvPath = (devPath, prodPath) => (isDevEnv ? devPath : prodPath);

const handleError = err => {
  plugins.notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
  })(err);

  this.emit('end');
};

gulp.task('browsersync', () => browsersync(serverConfig));

gulp.task('clean', async() => {
  del([`${paths.dev}/**/*.*`, `${paths.build}/**/*.*`], {
    force: true,
  });
});

gulp.task('scripts', async() => {
    gulp.src(paths.scripts.entry)
    .pipe(plugins.plumber({
      errorHandler: handleError,
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(handleNodeEnvPath(paths.dev, paths.build)));
});

gulp.task('html', async() => {
    gulp.src([handlePath(paths.src, '/views/**/*.html'), excludePath('**', '/shared/**/*'), excludePath('**', '/partials/**/*')])
    .pipe(plugins.nunjucksRender({
        path: [handlePath(paths.src, '/views')],
      }))
    .pipe(plugins.plumber({
      errorHandler: handleError,
    }))
    .pipe(plugins.if(!isDevEnv, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    })))
    .pipe(gulp.dest(handleNodeEnvPath(paths.dev, paths.build)));
});

gulp.task('sass', async() => {
    const postCSSPlugins = [
      require('autoprefixer')({
        browsers: ['last 3 versions'],
      }),
      require('postcss-flexibility'),
      require('postcss-pxtorem'),
      require('gulp-cssnano'),
    ];

    gulp.src([handlePath(paths.src, '/sass/**/*.scss')])
    .pipe(plugins.plumber({
      errorHandler: handleError,
    }))
    .pipe(plugins.sassLint())
    .pipe(plugins.if(isDevEnv, plugins.sourcemaps.init()))
    .pipe(plugins.sass({
      outputStyle: isDevEnv ? 'compact' : 'compressed',
    }).on('error', handleError))
    .pipe(plugins.postcss(postCSSPlugins))
    .pipe(plugins.rename('main.min.css'))
    .pipe(plugins.if(isDevEnv, plugins.sourcemaps.write()))
    .pipe(gulp.dest(handleNodeEnvPath(handlePath(paths.dev, paths.css), handlePath(paths.build, paths.css))));
});

gulp.task('images', async() => {
  gulp.src([handlePath(paths.src, '/images/**/*')])
  .pipe(plugins.if(isDevEnv, plugins.imagemin([
    plugins.imagemin.gifsicle({
      interlaced: true,
    }),
    plugins.imagemin.jpegtran({
      progressive: true,
    }),
  ]),
  plugins.imagemin([
    plugins.imagemin.gifsicle({
      interlaced: true,
    }),
    plugins.imagemin.jpegtran({
      progressive: true,
    }),
    plugins.imagemin.optipng({
      optimizationLevel: 5,
    }),
    plugins.imagemin.svgo({
      plugins: [
        {
          cleanupAttrs: true,
        },
        {
          removeDoctype: true,
        },
        {
          removeXMLProcInst: true,
        },
        {
          removeComments: true,
        },
        {
          removeMetadata: true,
        },
        {
          removeUselessDefs: true,
        },
        {
          removeEditorsNSData: true,
        },
        {
          removeEmptyAttrs: true,
        },
        {
          removeHiddenElems: false,
        },
        {
          removeEmptyText: true,
        },
        {
          removeEmptyContainers: true,
        },
        {
          cleanupEnableBackground: true,
        },
        {
          cleanupIDs: false,
        },
        {
          convertStyleToAttrs: true,
        },
        {
          mergePaths: true,
        },
      ],
    }),
  ])))
  .pipe(gulp.dest(handleNodeEnvPath(handlePath(paths.dev, '/images'), handlePath(paths.build, '/images'))));
});

gulp.task('fonts', async() => {
  gulp.src([handlePath(paths.src, '/fonts/**/*.{woff,woff2}')])
  .pipe(gulp.dest(handleNodeEnvPath(handlePath(paths.dev, '/fonts'), handlePath(paths.build, '/fonts'))));
});

gulp.task('watch', async() => {
  gulp.watch(handlePath(paths.src, '/**/*.js'), gulp.series('scripts'));
  gulp.watch(handlePath(paths.src, '/views/**/*.html'), gulp.series('html'));
  gulp.watch(handlePath(paths.src, '/sass/**/*.scss'), gulp.series('sass'));
  gulp.watch(handlePath(paths.src, '/images/**/*'), gulp.series('images'));
});

gulp.task('build',
  gulp.series('clean',
    'images',
    'sass',
    'html',
    'scripts',
    'fonts'));

gulp.task('default',
  gulp.series('clean',
    gulp.parallel('images',
      'sass',
      'html',
      'scripts',
      'fonts',
      'watch',
      'browsersync')));
