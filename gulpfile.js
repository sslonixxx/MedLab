const gulp = require('gulp');
const less = require('gulp-less');
const cleanCss = require('gulp-clean-css');

gulp.task('less-authorization', function() {
    return gulp.src('./authorization/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./authorization'));
})

gulp.task('less-registration', function() {
    return gulp.src('./registration/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./registration'));
})

gulp.task('less-profile', function() {
    return gulp.src('./profile/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./profile'));
})

gulp.task('less-patients', function() {
    return gulp.src('./patients/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./patients'));
})

gulp.task('less-patientCard', function() {
    return gulp.src('./patientCard/style.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('./patientCard'));
})

gulp.task('watch', function() {
    gulp.watch('./authorization/style.less', gulp.series('less-authorization'));
    gulp.watch('./registration/style.less', gulp.series('less-registration'));
    gulp.watch('./patients/style.less', gulp.series('less-patients'));
    gulp.watch('./patientCard/style.less', gulp.series('less-patientCard'));
    gulp.watch('./profile/style.less', gulp.series('less-profile'));
})




gulp.task('less', gulp.series('less-authorization', 'less-registration','less-profile','less-patients', 'less-patientCard'));
gulp.task('default', gulp.series('less', 'watch'));
