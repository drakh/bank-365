// -----------------------------------------------------------
// GULP : JavaScript Task
// -----------------------------------------------------------

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');


gulp.task('js', function() {
  gulp.src('./js/common.js')
    .pipe(rename('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
    .pipe(gulp.dest('./build/js/'));
});
