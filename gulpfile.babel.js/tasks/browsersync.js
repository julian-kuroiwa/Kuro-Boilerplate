'use strict';

import gulp from 'gulp';
import browserSync from 'browser-sync';
import config from './config';

gulp.task('browser-sync', () => {
    let files = [
        config.root.dest
    ];

    browserSync.init(files, {
        server: {
            baseDir: config.tasks.browserSync.server.baseDir
        },
    });
});