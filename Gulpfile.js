var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    webpack = require('webpack'),
    named = require('vinyl-named'),
    path = require('path'),
    ENV = 'prod',
    BUILD_ENV = {
        'prod': {
            dist: 'dist',
        },
    }[ENV],
    gazeOpts = {
        debounceDelay: 1000,
    },
    del = require('del');

function isProd() {
    return ENV === 'prod';
}

function isCI() {
    return process.env.TRAVIS === "true";
}

gulp.task('clean', function (done) {
    return del([
        BUILD_ENV.dist,
    ]);
});

gulp.task('default', ['clean', 'tslint']);

gulp.task('tslint', function() {
    return gulp.src([
        'src/**/*.ts'
    ])
    .pipe($.tslint({
        formatter: 'verbose',
        configuration: {
            rules: {
                quotemark: [true, 'single']
            },
        },
    }))
    .pipe($.tslint.report());
});

gulp.task('build', function() {
    var tsProject = $.typescript.createProject('./tsconfig.json');
    return gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .on('error', function (err) {
        if (isCI()) {
            throw new $.util.PluginError({
                plugin: "typescript",
                message: err,
            });
        }
        $.util.log($.util.colors.red(err));
    })
    .pipe(gulp.dest(BUILD_ENV.dist));
});
