const gulp     = require('gulp');
const newer    = require('gulp-newer');
const watch    = require('gulp-watch');
const jsonminify = require("jsonminify");
const through = require('through2');

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


gulp.task('copy', function() {
  return gulp.src(source_index + '/index.js', {base: source_index})
    // .pipe(watch(source_index, {base: source_index}))
    .pipe(gulp.dest(destination));
});


gulp.task('jsonMinify', function() {

  // gulp.src(source_json + '/*.json', {base: source_json})
  //     .pipe(jsonminify())
  //     .pipe(gulp.dest(destination));
  return gulp.src(['src/libraries/**/*.json'])
      // .pipe(jsonminify())
      .pipe(minifyJson())
      .pipe(gulp.dest('module/libraries'));
});


var minifyJson = () => {
  return through.obj((file, enc, cb) => {
    var transformedFile = file.clone();
    // console.log('NEW FILE', transformedFile.contents.toString())
    // console.log('NEW FILE', jsonminify2(transformedFile.contents.toString()));
    // transformedFile.contents = new Buffer(jsonminify2(transformedFile.contents.toString()));
    transformedFile.contents = new Buffer(jsonminify(transformedFile.contents.toString()).replace(/\,(?!\s*?[\{\[\"\'\w])/g, ''));
    // console.log('###',file.contents.toString());
    // return cb(null, file);
    return cb(null, transformedFile);
  });
}

// gulp.task('minify', function () {
//     return gulp.src(['path/to/files/*.json'])
//         .pipe(jsonminify())
//         .pipe(gulp.dest('dist'));
// });

// Edit watch locations in app.config.js!
