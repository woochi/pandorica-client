var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');

var config = require('./webpack-hot-dev-server.config.js');
var compiler = webpack(config);

gulp.task('watch', ['webpack:dev'], function () {
  gulp.watch(['app/**/*'], ['webpack:dev']);
});

gulp.task('webpack:dev', function (callback) {
  compiler.run(function (err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack:dev", err);
    }
    gutil.log("[webpack:dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function (callback) {
  new WebpackDevServer(compiler, {
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }).listen(8888, 'localhost', function (err) {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', 'http://localhost:8888/webpack-dev-server/index.html')
    }
  });
});

gulp.task('default', ['webpack:dev', 'webpack-dev-server']);
