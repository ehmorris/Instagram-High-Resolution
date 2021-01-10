import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import contentWebpackConfig from './content/webpack.config';

gulp.task('content-js', ['clean'], cb => {
  webpack(contentWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json').pipe(gulp.dest('./build'));
});

gulp.task('copy-locales', ['clean'], function() {
  return gulp
    .src(['./_locales/**/*'], {
      base: '.',
    })
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', cb => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'copy-locales', 'content-js']);

gulp.task('watch', ['default'], () => {
  gulp.watch('content/**/*', ['build']);
  gulp.watch('injected_script.js', ['build']);
});

gulp.task('default', ['build']);
