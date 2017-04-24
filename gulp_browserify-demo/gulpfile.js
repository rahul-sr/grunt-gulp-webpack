var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    sourceStream = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    input = {
        'scss': 'src/scss/*.scss',
        'js': 'src/js/*.js',
    },

    output = {
        'css': 'dist',
        'js': 'dist'
    };

/* compile scss files */
gulp.task('build-css', function() {
    return gulp.src(input.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(livereload());
});

/* build js files */
gulp.task('build-js', function() {
    return browserify('src/js/index.js')
        .bundle()
        .on('error', function(err) {
            console.log(err.stack);
        })
        .pipe(sourceStream('bundle.js'))
        .pipe(buffer())
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(output.js))
        .pipe(livereload());
});

/* Watch these files for changes and run the task on update */
gulp.task('watch', function() {
    var server = livereload.listen();
    gulp.watch(input.js, ['build-js']);
    gulp.watch(input.scss, ['build-css']);
});

/* Webserver and livereload */
gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 9002,
    });
});

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['watch', 'webserver', 'build-js', 'build-css']);
