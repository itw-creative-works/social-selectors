module.exports = {
  tasks: {
    copy: true,
    minifyJSON: true,
  },
  watch: function(gulp, watch) {
    return [
      watch([
        './src/index.js',
      ], function () {
        gulp.start('copy');
        gulp.start('jekyll-build');
      }),
      watch([
        'src/libraries/**/*',
      ], function () {
        gulp.start('minifyJSON');
        gulp.start('jekyll-build');

      })

    ]
  },
}
