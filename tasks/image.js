// -----------------------------------------------------------
// GULP : Image Task
// -----------------------------------------------------------

var gulp = require('gulp'),
  imagemin = require('gulp-imagemin');

gulp.task('image', function () {
    gulp.src('./images/*')
      .pipe(imagemin())
      .pipe(gulp.dest('./images/'));
  }
);
