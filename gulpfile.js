var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    header  = require('gulp-header'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    changed = require('gulp-changed'),
    svgmin = require('gulp-svgmin'),
    jade = require('gulp-jade'),
    package = require('./package.json');


var banner = [
  '/* * * * * * * * * * * * * * * * * * * * *\\ \n',
    ' <%= package.name %> ',
    'v<%= package.version %> \n ',
    '<%= package.description %> \n',
    ' (c) ' + new Date().getFullYear() + ' <%= package.author %> \n',
    ' <%= package.homepage %> \n',
  '\\* * * * * * * * * * * * * * * * * * * * */',
  '\n'
].join('');

gulp.task('styles', function(){
  return sass('src/styles/', 
              { style: 'expanded' })
              .pipe(header(banner, { package : package }))
              .pipe(autoprefixer())
              .pipe(gulp.dest('dist/assets/css'))
              .pipe(rename({suffix: '.min'}))
              .pipe(cssmin())
              .pipe(header(banner, { package : package }))
              .pipe(gulp.dest('dist/assets/css'))
              .pipe(notify({ message: 'Styles task complete!'}));
});

gulp.task('scripts', function(){
  return gulp.src('src/scripts/**/*.js')
              .pipe(changed('dist/assets/js'))
              .pipe(jshint())
              .pipe(jshint.reporter('jshint-stylish'))
              //.pipe(concat('main.js'))
              .pipe(gulp.dest('dist/assets/js'))
              .pipe(rename({suffix: '.min'}))
              .pipe(uglify())
              .pipe(gulp.dest('dist/assets/js'))
              .pipe(notify({ message: 'Scripts task complete!'}));
});

gulp.task('images', function(){
  return gulp.src('src/images/**/*')
              .pipe(imagemin({ 
                optimizationLevel:3, 
                progressive: true, 
                interlaced: true,
                svgoPlugins: [{cleanupIDs: false}]
                }))
              .pipe(gulp.dest('dist/assets/img'))
              .pipe(notify({ message: 'Images task complete!'}));
});

gulp.task('templates', function(){
  return gulp.src('src/templates/*.jade')
              .pipe(jade({
                pretty: true
              }))
              .pipe(gulp.dest('dist'))
});

gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('copy-fonts', function(){
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('default', ['clean'], function() {
    gulp.start('templates', 'styles', 'scripts', 'images', 'copy-fonts');
});

gulp.task('watch', function(){

  // Watch .jade files
  gulp.watch('src/templates/**/*.jade', ['templates']);

  // Watch .scss files
  gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('src/images/**/*', ['images']);

  // Watch font files
  gulp.watch('src/fonts/**/*', ['copy-fonts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', livereload.changed);

});