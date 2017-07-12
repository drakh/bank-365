/*-----------------------------------------------------------
 GULP : Sprite Task
 -----------------------------------------------------------*/

var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('sprite', function () {
  var spriteData = gulp.src('./img/for-sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    imgPath: '../img/sprite/sprite.png'
  }));

  spriteData.img.pipe(gulp.dest('./img/sprite/'));
  spriteData.css.pipe(gulp.dest('./css/sprites/'));

});