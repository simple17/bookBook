var gulp = require('gulp');

gulp.task('delivery', function(){
  gulp.src('./src/index.html')
      .pipe(gulp.dest('./client'));
})

gulp.task('default', ['delivery']);
