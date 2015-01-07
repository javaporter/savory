var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-express');


sassPaths = [
  'assets/bower_components/foundation/scss',
]

gulp.task('sass', function() {
  return gulp.src('assets/stylesheets/app.scss')
    .pipe(sass({
      includePaths: sassPaths,
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public'))
    .pipe(livereload());
});

function notify_live_reload(e) {
  gulp.src(e.path, {read: false})
    .pipe(livereload());
}

gulp.task('watch', function() {
  gulp.watch(['views/**/*.jade'], notify_live_reload);
  gulp.watch(['assets/stylesheets/**/*.scss'], ['sass']);
});

gulp.task('default', ['sass', 'watch'], function() {
  livereload.listen();
});
