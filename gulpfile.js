'use strict';
var gulp = require('gulp');

var ts = require('gulp-typescript');
var ava = require('gulp-ava');
var del = require('del');
var mocha = require('gulp-mocha');

gulp.task('default', function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      noExternalResolve: true,
      module: 'commonjs',
      noImplicitAny: false
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-compiled-tests', function () {
  return del('test-compiled');
});

gulp.task('compile-tests', ['clean-compiled-tests'], function () {
  return gulp.src(['test/**/*.ts', 'typings/**/*.ts'])
    .pipe(ts({
      module: 'commonjs',
      noExternalResolve: true,
      noImplicitAny: false
    }))
    .pipe(gulp.dest('test-compiled/'));
});

gulp.task('test',  ['compile-tests'], function () {
  // return gulp.src('test-compiled/**/*.js')
  //   .pipe(ava());
  return gulp.src('test-compiled/spec.js', {read: false})
      // gulp-mocha needs filepaths so you can't have any plugins before it
      .pipe(mocha({reporter: 'nyan'}));
});


gulp.task('test-watch', function () {
  gulp.watch('test/*.ts', ['test']);
});
