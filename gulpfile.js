var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('deliveryHtml', function(){
  gulp.src('./src/*.html')
      .pipe(gulp.dest('./client'));
});

gulp.task('deliveryJs', function(){
  gulp.src('./node_modules/whatwg-fetch/fetch.js')
      .pipe(gulp.dest('./client/js'));
});

gulp.task('deliveryCss', function(){
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./client/css'));
  gulp.src('./src/css/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('./client/css'));
});

gulp.task('deliveryFonts', function(){
  gulp.src('./node_modules/bootstrap/dist/fonts/*.*')
      .pipe(gulp.dest('./client/fonts'));
});

gulp.task('deliveryImages', function(){
  gulp.src('./src/img/*.*').pipe(gulp.dest('./client/img'));
});

gulp.task('delivery', ['deliveryHtml', 'deliveryCss', 'deliveryFonts', 'deliveryImages', 'deliveryJs']);

gulp.task('default', ['delivery']);
