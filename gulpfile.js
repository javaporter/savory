var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-express');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');


// Extra sass include paths
var sass_include_paths = [
  'assets/bower_components/foundation/scss',
]

// JS assets
var js_assets = [
  'assets/bower_components/modernizr/modernizr.js',
  'assets/bower_components/jquery/dist/jquery.js',
  'assets/bower_components/foundation/js/foundation/foundation.js',
  'assets/bower_components/fastclick/lib/fastclick.js',
  'assets/javascripts/owl.carousel.min.js',
  'assets/javascripts/app.js'
]

function notify_live_reload(e) {
  gulp.src(e.path, {read: false})
  .pipe(livereload());
}

gulp.task('sass', function() {
  return gulp.src('assets/stylesheets/app.scss')
    .pipe(sass({
      includePaths: sass_include_paths,
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('public/assets/'))
    .pipe(livereload());
});

gulp.task('js', function () {
  gulp.src(js_assets)
    .pipe(uglify({
      beautify: true,
      mangle: false
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('public/assets/'))
    .pipe(livereload());

  return gulp.src('assets/javascripts/analytics.js')
    .pipe(uglify({
      beautify: true,
      mangle: false
    }))
    .pipe(gulp.dest('public/assets/'));
});

gulp.task('watch', function() {
  gulp.watch(['views/**/*.jade'], notify_live_reload);
  gulp.watch(['assets/stylesheets/**/*.scss'], ['sass']);
  gulp.watch(['assets/javascripts/**/*.js'], ['js']);
});

gulp.task('default', ['sass', 'js', 'watch'], function() {
  livereload.listen();
  nodemon({
    ext: 'js',
    ignore: ['public/**',  'views/**', 'assets/**', 'bin/**'],
    script: 'bin/dev-server'
  })
  .on('restart', function() {
    console.log('Restarted server');
  });
});
