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
      })

    ]
  }
}
