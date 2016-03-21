/**
 * Created by David Chiu on 3/21/16.
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

gulp.task('sass', function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('web', ['sass'], function() {
    browserSync.init({
        proxy: 'http://localhost:3000',
        port:3001
    });

    gulp.watch("./public/sass/*.scss", ['sass']).on('change', browserSync.reload);
    gulp.watch("./public/jade/*.jade").on('change', browserSync.reload);
    gulp.watch("./public/js/*.js").on('change', browserSync.reload);
});

gulp.task('nodemon', function() {
    nodemon({ script : './index.js', ext : 'js' });
});

gulp.task('lint', function(){
    return gulp.src(['./public/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('set-env', function () {
    env({
        vars: {
            NODE_ENV: "dev"
        }
    });
});

gulp.task('default', ['set-env', 'nodemon', 'web']);
gulp.task('server', ['set-env', 'nodemon']);
gulp.task('dist', ['set-env', 'nodemon']);
