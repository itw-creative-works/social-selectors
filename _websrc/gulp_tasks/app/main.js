const gulp     = require('gulp');
const newer    = require('gulp-newer');
const watch    = require('gulp-watch');
const through  = require('through2');
const JSON5    = require('json5');
const del      = require('del');

// Tasks
let source_index = './src';
let source_json = './src/libraries';
let destination = './module';

gulp.task('copy', function() {
  return gulp.src(source_index + '/index.js', {base: source_index})
    .pipe(gulp.dest(destination));
});

gulp.task('minifyJSON', async function() {

  await del(['module/libraries/**/*']);

  return gulp.src(['src/libraries/**/*.json'])
    .pipe(minifyJson())
    .pipe(gulp.dest('module/libraries'));
});


let minifyJson = () => {
  return through.obj((file, enc, cb) => {
    let transformedFile = file.clone();
    transformedFile.contents = new Buffer(JSON.stringify(JSON5.parse(transformedFile.contents.toString())));
    return cb(null, transformedFile);
  });
}
