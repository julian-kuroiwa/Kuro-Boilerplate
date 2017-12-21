'use strict';

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import nunjucksRender from 'gulp-nunjucks-render';
import imagemin from 'gulp-imagemin';
import path from 'path';
import del from 'del';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import CONFIG from './config';

const exclude = path.normalize('!**/{' + CONFIG.tasks.html.excludeFolders.join(',') + '}/**');

const paths = {
    html: {
        src: [path.join(CONFIG.root.src, CONFIG.tasks.html.src, '/**/*.html'), exclude],
        dest: path.join(CONFIG.root.dest, CONFIG.tasks.html.dest)
    },
    css: {
        src: path.join(CONFIG.root.src, CONFIG.tasks.css.src, '/**/*.{' + CONFIG.tasks.css.extensions + '}'),
        dest: path.join(CONFIG.root.dest, CONFIG.tasks.css.dest)
    },
    img: {
        src: path.join(CONFIG.root.src, CONFIG.tasks.images.src, '/**'),
        dest: path.join(CONFIG.root.dest, CONFIG.tasks.images.dest)
    }
};

gulp.task('html', () => {
    return gulp.src(paths.html.src)
        .pipe(plumber())
        .pipe(nunjucksRender({ path: ['src/html'] }))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream({ once: true }));
});

gulp.task('images', () => {
    return gulp.src(paths.img.src)
        .pipe(plumber())
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest(paths.img.dest));
});

gulp.task('sass', () => {
    return gulp.src(paths.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browserSync.stream());
});

gulp.task('clean', () => {
    return del('build/');
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
    });
});

gulp.task('watch', () => {
    gulp.watch(paths.html.src, { debounceDelay: 300 }, ['html']);
    gulp.watch(paths.css.src, ['sass']);
    gulp.watch(paths.img.src, ['images']);
});

gulp.task('build', ['clean'], () => {
    gulp.start('html');
    gulp.start('sass');
    gulp.start('images');
});

gulp.task('default', ['watch', 'browser-sync']);