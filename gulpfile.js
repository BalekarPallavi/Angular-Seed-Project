var gulp = require('gulp');
var concat = require('gulp-concat');
var sass= require('gulp-sass');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

gulp.task('f1', function(done){
  console.log("Hello");
  done();
});

gulp.task('concat', function(done){
  return gulp.src('src/app/demo/**/*.js')
    .pipe(concat('sample.js'))
    .pipe(gulp.dest('src/app/dest'))
    .pipe(browserSync.reload({
      stream: true
    }))
  done();
});

gulp.task('browserSync', function(done) {
  browserSync.init({
    server: {
      baseDir: 'src'
    },

  })
  done();
});

function reload(done) {
  browserSync.reload();
  done();
}
gulp.task('sass', function(done){
  return gulp.src('src/assets/scss/*.scss')
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
  done();
});

gulp.task('watch' , function(done){

  gulp.watch('src/assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch("src/*.html").on('all', browserSync.reload);
  gulp.watch('src/app/demo/**/*.js', gulp.series('concat'));
    gulp.watch('src/scripts/*.coffee' ,gulp.series('script'));
  done();
});



gulp.task('copy', function(done) {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('src/assets'))
  done();
});

gulp.task('log', function (done) {
  gutil.log( '== My Log Task ==');
  done();

});

gulp.task('script', function(done){
  gulp.src('src/scripts/main.coffee')
    .pipe(coffee({bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('src/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
  done();
});

gulp.task('js', function (done) {
  gulp.src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('src/assets'))
  done();
});

gulp.task('images', function(done){
  return gulp.src('src/assets/images/*.+(png|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
  done();
});

gulp.task('images', function(done){
  return gulp.src('src/assets/images/*.+(png|jpeg|gif|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
  done();
});

gulp.task('fonts', function() {
  return gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

gulp.task('default', gulp.series('watch','browserSync'));
