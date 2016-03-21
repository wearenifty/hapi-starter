/**
 * Created by David Chiu on 3/21/16.
 *
 * Workflow tech stack:
 * - http://nodemon.io/
 * - https://www.browsersync.io/
 * - http://sass-lang.com/
 *
 * Additional recommended workflow tool:
 * - https://ngrok.com/
 *
 * (enables local development and testing of 3rd party API integrations which require
 *  a callback URL such as Slack or Instagram)
 *  
 *
 * This pipeline speeds up the development workflow by:
 *
 * - Automatically restarting the node application when application file are modified
 * - Automatically reloading the web page when changes are made to SASS, JS or JADE files
 *
 *
 *
 *
 * The `gulp` command will start the NodeJS app without launching a browser session
 *
 * The `gulp serve` command starts the nodeJS app and launches a browser using browserSync
 *
 * The `gulp dist` command creates a static HTML/JS/CSS
 *
 *
 *
 */

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var env = require('gulp-env');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var jade = require('gulp-jade');

gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src('./public/jade/*.jade')
        .pipe(jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
    return gulp.src('./public/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('copyJS', function () {
    return gulp.src('./public/js/*.js')
        .pipe(gulp.dest('./dist/js'));
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

gulp.task('default', ['set-env', 'nodemon']);
gulp.task('serve', ['set-env', 'nodemon', 'web']);
gulp.task('dist', ['jade', 'sass', 'copyJS']);
