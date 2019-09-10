module.exports = {
  tasks: {
    copy: true,
    jsonMinify: true,
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
        gulp.start('jsonMinify');
        gulp.start('jekyll-build');

      })

    ]
  }
}
