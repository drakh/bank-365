// -----------------------------------------------------------
// GULP : Browser Sync Task
// -----------------------------------------------------------

var gulp = require('gulp'),
  browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync.init(["./html/*.html", "./**/*.js", "./**/*.css",
    "./libs/*"
  ], {
    server: {
      baseDir: "./",
      routes: {
        "/bower_components": "bower_components",
        "/css": "css",
        "/images": "images",
        "/fonts": "fonts",
        "/libs": "libs",
        "/js": "js",
        "/build": "build"
      }
    }
  });
});
