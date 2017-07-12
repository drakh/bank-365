// -----------------------------------------------------------
// GULP : Watch
// -----------------------------------------------------------

var gulp = require('gulp');

gulp.task('watch', function() {
  gulp.watch("css/*/*", ['sass']);
  gulp.watch("jade/**/*.jade", ['jade']);
  // gulp.watch("js/common.js", ['js']);
  gulp.watch("img/for-sprite/*", ['sprite']);
  gulp.watch("img/for-optimization/*", ['image']);
});
