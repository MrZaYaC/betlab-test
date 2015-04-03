var gulp          = require('gulp');
var jade          = require('gulp-jade');
var imagemin      = require('gulp-imagemin');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var ngAnnotate    = require('gulp-ng-annotate');
var minifyHTML    = require('gulp-minify-html');
var coffee        = require('gulp-coffee');
var karma         = require('gulp-karma');

dev_path = {
  jade: './src/jade/pages/**/*.jade',
  scss: './src/scss/*.scss',
  svg: './src/img/**/*.svg',
  images: './src/img/**',
  js: './src/js/**',
  angular: './src/angular/**/*.js',
  angularModule: './src/angular/**/module.js',
  iconFont: './src/fonts/icon-font/*.svg'
};

pub_path = {
  html: './public/',
  images: './public/img/',
  js: './public/js/',
  css: './public/css/',
  fonts: './public/fonts/'
};

gulp.task('jsminify', function() {
  gulp.src(dev_path.js)
    .pipe(uglify())
    .pipe(gulp.dest(pub_path.js))
});

gulp.task('jade', function(){
    gulp.src(dev_path.jade)
        .pipe(jade({pretty: true}))
        .pipe(minifyHTML())
      .pipe(gulp.dest(pub_path.html))
});

gulp.task('images', function() {
  return gulp.src(dev_path.images)
    .pipe(imagemin())
    .pipe(gulp.dest(pub_path.images))
});

gulp.task('coffee', function() {
    gulp.src('./src/**/*.coffee')
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('./src/'))
});

gulp.task('angular', function () {
    gulp.src(['./src/angular/module.js', './src/angular/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(gulp.dest(pub_path.js))
});

gulp.task('test', function() {
    // Be sure to return the stream
    // NOTE: Using the fake './foobar' so as to run the files
    // listed in karma.conf.js INSTEAD of what was passed to
    // gulp.src !
    return gulp.src('./foobar')
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            console.log(err);
            this.emit('end'); //instead of erroring the stream, end it
        });
});

gulp.task('autotest', function() {
    return gulp.watch('./src/test/*.js', ['test']);
});

gulp.task('watch', function () {
  gulp.watch('./src/img/**', ['images']);
  gulp.watch('./src/jade/**', ['jade']);
  gulp.watch('./src/js/**', ['jsminify']);
  gulp.watch('./src/angular/**', ['coffee', 'angular']);
  gulp.watch('./src/test/*.coffee', ['coffee']);
});

gulp.task('dev',['watch', 'jade', 'images', 'jsminify', 'coffee', 'angular']);
gulp.task('pub',['jade', 'images', 'jsminify', 'coffee', 'angular']);

