var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    changed = require('gulp-changed'),
    input = {
        'scss': 'src/scss/*.scss',
        'js': 'src/js/*.js',
        'img': 'src/images/*.+(png|jpg|gif)'
    },

    output = {
        'css': 'dist',
        'js': 'dist',
        'img': 'dist/images'
    };

/*gulp.task('compass', function() {
    return gulp.src(input.scss)
        .pipe(sass())
        .pipe(gulp.dest(output.css))
});*/

/* compile scss files */
gulp.task('build-css', function() {
    return gulp.src(input.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.css))
        .pipe(livereload());
});

/* concat js files, minify if --type production */
gulp.task('build-js', function() {
    return gulp.src(input.js)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output.js))
        .pipe(livereload());
});

/* Image minify task */
gulp.task('imagemin', function() {
    return gulp.src(input.img)
        //.pipe(changed(output.img))
        .pipe(imagemin())
        .pipe(gulp.dest(output.img));
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

/* Custom task */
gulp.task('hello', function() {
    console.log('Hello World!!');
});


/* run the watch task when gulp is called without arguments */
gulp.task('default', ['watch', 'webserver', 'imagemin']);
