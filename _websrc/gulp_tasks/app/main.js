const gulp     = require('gulp');
const newer    = require('gulp-newer');
const watch    = require('gulp-watch');
const jsonminify = require('gulp-jsonminify');

// Tasks
// gulp.task('main', function () {
//
//   gulp.src(['./src/**/*'])
//     .pipe(newer('./src/index.js'))
//     .pipe(gulp.dest('./module'));
//
//   // gulp.src(['./src/**/*'])
//   //   .pipe(newer('./src/libraries'))
//   //   .pipe(gulp.dest('./module/libraries'));
//
// });
var source_index = './src';
var source_json = './src/libraries';
var destination = './module';

gulp.task('main', function() {
  gulp.src(source_index + '/index.js', {base: source_index})
    .pipe(watch(source_index, {base: source_index}))
    .pipe(gulp.dest(destination));

  // gulp.src(source_json + '/*.json', {base: source_json})
  //     .pipe(jsonminify())
  //     .pipe(gulp.dest(destination));
  return gulp.src(['src/libraries/**/*.json'])
      .pipe(jsonminify())
      .pipe(gulp.dest('module/libraries'));
});


// gulp.task('minify', function () {
//     return gulp.src(['path/to/files/*.json'])
//         .pipe(jsonminify())
//         .pipe(gulp.dest('dist'));
// });

// Edit watch locations in app.config.js!
