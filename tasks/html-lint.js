// -----------------------------------------------------------
// GULP : Html Task
// -----------------------------------------------------------

var gulp = require('gulp'),
    html5Lint = require('gulp-html5-lint');


gulp.task('html:lint', function() {
  return gulp.src('./html/*.html')
    .pipe(html5Lint());
});
