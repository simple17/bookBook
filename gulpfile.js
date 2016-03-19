var gulp = require('gulp');

gulp.task('deliveryHtml', function(){
  gulp.src('./src/index.html')
      .pipe(gulp.dest('./client'));
});

gulp.task('deliveryJs', function(){
  gulp.src('./node_modules/whatwg-fetch/fetch.js')
      .pipe(gulp.dest('./client/js'));
});

gulp.task('deliveryCss', function(){
  gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./client/css'));
  gulp.src('./src/css/main.css').pipe(gulp.dest('./client/css'));
});

gulp.task('deliveryFonts', function(){
  gulp.src('./node_modules/bootstrap/dist/fonts/*.*')
      .pipe(gulp.dest('./client/fonts'));
});

gulp.task('delivery', ['deliveryHtml', 'deliveryCss', 'deliveryFonts', 'deliveryJs']);

gulp.task('default', ['delivery']);
