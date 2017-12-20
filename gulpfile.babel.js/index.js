'use strict';

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import nunjucksRender from 'gulp-nunjucks-render';
import path from 'path';
import del from 'del';
import CONFIG from './config';

const exclude = path.normalize('!**/{' + CONFIG.tasks.html.excludeFolders.join(',') + '}/**');

const paths = {
    src: [path.join(CONFIG.root.src, CONFIG.tasks.html.src, '/**/*.html'), exclude],
    dest: path.join(CONFIG.root.dest, CONFIG.tasks.html.dest)
};

gulp.task('html', () => {
    return gulp.src(paths.src)
        .pipe(plumber())
        .pipe(nunjucksRender({
            path: ['src/html']
        }))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(paths.dest))
        .pipe(browserSync.stream({ once: true }));
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
    gulp.watch('src/html/**/*.html', ['html']);
});

gulp.task('build', ['clean'], () => {
    gulp.start('html');
});

gulp.task('default', ['watch', 'browser-sync']);