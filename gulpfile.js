// grab our gulp packages
var gulp  = require('gulp');
var gutil = require('gulp-util');
var using = require('gulp-using');

var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var templates  = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');

// config ==============================================
var path = {
  js: {
    bundle: ['src/client/app/app.module.js',
             'src/client/app/**/*.module.js',
             'src/client/app/**/*.js'],
    vendor: ['bower_components/jquery/dist/jquery.min.js',
             'bower_components/angular/angular.min.js',
             'bower_components/**/*.min.js',
             '!bower_components/font-awesome/**/*.js']
  },
  templates: 'src/client/app/**/*.html'
};

// tasks ===============================================

gulp.task('default', ['build', 'watch']);
gulp.task('build', ['js-bundle', 'js-vendor', 'templates']);

gulp.task('watch', function() {
  gulp.watch(path.templates, ['build']);
  gulp.watch(path.js.bundle, ['js-bundle']);
});

gulp.task('js-bundle', function() {
  gulp.src(path.js.bundle)
    .pipe(using())
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(gutil.env.type == 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});
gulp.task('js-vendor', function() {
  gulp.src(path.js.vendor)
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets'));
});

function jsBuild(src, dest) {
}
gulp.task('templates', function() {
  return gulp.src(path.templates)
    .pipe(minifyHTML({
      quotes: true
    }))
    .pipe(templates('templates.js', { module: 'app' }))
    .pipe(gulp.dest('public/assets'));
});
