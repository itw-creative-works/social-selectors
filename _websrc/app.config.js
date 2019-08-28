module.exports = {
  tasks: {
    main: true,
  },
  watch: function(gulp, watch) {
    return [

      watch([
        './src/**/*',
      ], function () {
        gulp.start('main');
      })

    ]
  }
}
