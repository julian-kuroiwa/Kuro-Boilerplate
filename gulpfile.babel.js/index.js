'use strict';

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync';
import CONFIG from './config';

gulp.task('html', () => {
    gulp.src('src/html/index.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true, conservativeCollapse: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', () => {
    gulp.watch('dist/index.html', ['html']);
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
    });
});

gulp.task('build', ['clean'], () => {
    gulp.start('html');
});

gulp.task('default', ['html', 'watch', 'browser-sync']);