const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
// const uglify = require('gulp-uglify');
const del = require('del');
const deploy = require('gulp-gh-pages');

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: 'src',
    },
  });

  gulp.watch('src/*.html').on('change', browserSync.reload);
  gulp.watch('src/scss/*.scss').on('change', browserSync.reload);
  gulp.watch('src/js/**/*.js').on('change', browserSync.reload);
});

gulp.task('mincss', function () {
  return gulp
    .src('src/scss/**/*.+(scss|sass)')
    .pipe(
      sass({
        outputStyle: 'compressed',
      }).on('error', sass.logError),
    )
    .pipe(
      rename({
        suffix: '.min',
        prefix: '',
      }),
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: 'ie8',
      }),
    )
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.stream());
});

// gulp.task('minjs', function () {
//   return gulp
//     .src('src/js/*.js')
//     .pipe(
//       rename({
//         suffix: '.min',
//         prefix: '',
//       }),
//     )
//     .pipe(uglify())
//     .pipe(gulp.dest('dist/js'))
//     .pipe(browserSync.stream());
// });

gulp.task('scripts', function () {
  return gulp.src('src/js/**/*.js').pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.+(scss|sass|css)', gulp.parallel('mincss'));
  gulp.watch('src/*.html').on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
  return gulp
    .src('src/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      }),
    )
    .pipe(gulp.dest('dist/'));
});

// gulp.task('fonts', function () {
//   return gulp.src('src/fonts/**/*').pipe(gulp.dest('dist/fonts'));
// });

// gulp.task('icons', function () {
//   return gulp.src('src/icons/**/*').pipe(imagemin()).pipe(gulp.dest('dist/icons'));
// });

gulp.task('images', function () {
  return gulp.src('src/img/**/*').pipe(imagemin()).pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
  return del(['./dist/*']);
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*').pipe(deploy());
});

// gulp.task('mailer', function () {
//   return gulp.src('src/mailer/**/*').pipe(gulp.dest('dist/mailer'));
// });

gulp.task(
  'default',
  gulp.parallel('watch', 'server', 'scripts', 'mincss', 'clean', 'html', 'images'),
);
