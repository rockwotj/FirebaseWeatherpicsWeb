gulp = require 'gulp'
streamqueue = require 'streamqueue'
concat = require 'gulp-concat'
cssmin = require 'gulp-cssmin'
htmlmin = require 'gulp-htmlmin'
jshint = require 'gulp-jshint'
rename = require 'gulp-rename'
uglify = require 'gulp-uglify'

gulp.task 'hello', ->
  console.log 'Hello, gulp!'

gulp.task 'css', ->
  return streamqueue objectMode: true,
    gulp.src('lib/stylesheets/*.min.css'),
    gulp.src('stylesheets/*.css')
    .pipe cssmin()
  .pipe concat 'weatherpics.min.css'
  .pipe gulp.dest 'build/stylesheets/'

gulp.task 'html', ->
  return gulp.src ['*.html', 'partials/*.html'], base: '.'
  .pipe htmlmin collapseWhitespace: true
  .pipe gulp.dest 'build/'

gulp.task 'js', ->
  return streamqueue objectMode: true,
    gulp.src('lib/js/*.min.js'),
    gulp.src('lib/js/angular-bootstrap.js')
    .pipe(uglify()),
    gulp.src('js/*.js')
    .pipe jshint()
    .pipe jshint.reporter 'default'
    .pipe uglify()
  .pipe concat 'weatherpics.min.js'
  .pipe gulp.dest 'build/js/'

gulp.task 'fonts', ->
  return gulp.src 'lib/fonts/*'
  .pipe gulp.dest 'build/fonts/'

gulp.task 'default', ['css', 'html','js', 'fonts']
