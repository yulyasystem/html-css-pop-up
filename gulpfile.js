const gulp = require('gulp');
const inject = require('gulp-inject');
const webserver = require('gulp-webserver');

const PATH = {
  src: 'src/**/*',
  srcHTML: 'src/**/*.html',
  srcCSS: 'src/**/*.css',
  srcJS: 'src/**/*.js',

  build: 'build',
  buildIndex: 'build/index.html',
  buildCSS: 'build/**/*.css',
  buildJS: 'build/**/*.js'
};

gulp.task('html', function () {
  return gulp.src(PATH.srcHTML).pipe(gulp.dest(PATH.build));
});

gulp.task('css', function () {
  return gulp.src(PATH.srcCSS).pipe(gulp.dest(PATH.build));
});

gulp.task('js', function () {
  return gulp.src(PATH.srcJS).pipe(gulp.dest(PATH.build));
});

gulp.task('copy', gulp.series(['html', 'css', 'js']));

gulp.task('inject', gulp.series(['copy'], function () {
  let css = gulp.src(PATH.buildCSS);
  let js = gulp.src(PATH.buildJS);
  return gulp.src(PATH.buildIndex)
    .pipe(inject(css, {
      relative: true
    }))
    .pipe(inject(js, {
      relative: true
    }))
    .pipe(gulp.dest(PATH.build));
}));

gulp.task('serve', gulp.series(['inject'], function () {
  return gulp.src(PATH.build)
    .pipe(webserver({
      port: 3000,
      livereload: true
    }));
}));

gulp.task('watch', gulp.series(['serve'], function () {
  gulp.watch(PATH.src, gulp.series(['inject']));
}));

gulp.task('default', gulp.parallel(['watch']));
