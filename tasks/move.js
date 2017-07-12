// -----------------------------------------------------------
// GULP : Copy
// -----------------------------------------------------------

var gulp = require('gulp');

var filesToMove = [
  './*.html',
  './img/*',
  '!./img/for-optimization',
  './img/icons/*',
  './fonts/**/*',
  './libs/**/*'
];

gulp.task('move', function(){
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  gulp.src(filesToMove, { base: './' })
    .pipe(gulp.dest('build'));
});
