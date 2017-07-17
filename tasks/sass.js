/*-----------------------------------------------------------
 GULP : SASS Task
 -----------------------------------------------------------*/

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  pixrem = require('gulp-pixrem'),
  minify_css = require('gulp-minify-css'),
  rename = require("gulp-rename"),
  plumber = require("gulp-plumber"),
  sourcemaps = require('gulp-sourcemaps'),
  scsslint = require('gulp-scss-lint'),
  debug = require('gulp-debug');

gulp.task('sass', function () {
  gulp.src(['./css/styles.scss'])
    .pipe(debug({title: 'scss:'}))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: ['scss', 'node_modules/susy/sass'],
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(minify_css())
    .pipe(sourcemaps.write())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./css/'))
    .pipe(gulp.dest('./build/css/'));
});

gulp.task('scss:lint', function () {
  return gulp.src(['./css/**/*.scss', '!*/css/bourbon/**/*', '!*/css/**/*.css'])
    .pipe(scsslint({
        'config': '.scss-lint.yml'
      })
    );
});
