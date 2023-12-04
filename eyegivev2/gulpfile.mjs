import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import browserSyncBase from 'browser-sync';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import * as del from 'del';

const { src, dest, watch, series, parallel } = gulp;
const browserSync = browserSyncBase.create();

// Clean dist directory
export const clean = () => del(['dist/*']);

// Task for including files and minifying HTML
export function html() {
    return src('src/html/**/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('dist'))
        .pipe(browserSync.stream());
}

// Task for copying and minifying CSS
export function css() {
    return src('src/css/**/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// Task for copying and minifying JS
export function js() {
    return src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// Task for copying images
export function images() {
    return src('src/images/**/*')
        .pipe(dest('dist/images'));
}

// Static server + watching html/css/js files
function serve() {
    browserSync.init({
        server: "./dist"
    });

    watch('src/html/**/*.html', html);
    watch('src/layouts/**/*.html', html);
    watch('src/partials/**/*.html', html);
    watch('src/css/**/*.css', css);
    watch('src/js/**/*.js', js);
}

// Build task to run all tasks for production
const build = series( parallel(html, css, js, images));

// Default task for development
export default series(build, serve);
