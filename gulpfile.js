const gulp = require('gulp');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');

gulp.task('less-authorization', function() {
    return gulp.src('./authorization/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./authorization'));
})

gulp.task('less-profile', function() {
    return gulp.src('./profile/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./profile'));
})

gulp.task('watch', function() {
    gulp.watch('./authorization/style.less', gulp.series('less-authorization'));
    gulp.watch('./profile/style.less', gulp.series('less-profile'));
})



gulp.task('less', gulp.series('less-authorization', 'less-profile'));
gulp.task('default', gulp.series('less', 'watch'));
