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

// Task for processing HTML
export const html = () => src('src/html/**/*.html')
    .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
    .pipe(dest('dist'))
    .pipe(browserSync.stream());

// Task for processing CSS
export const css = () => src('src/css/**/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());

// Task for processing JS
export const js = () => src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(dest('dist/js'))
    .pipe(browserSync.stream());

// Task for copying assets
export const assets = () => src('src/assets/**/*')
    .pipe(dest('dist/assets'));

// Static server + watching files
function serve() {
    browserSync.init({ server: "./dist" });
    watch(['src/html/**/*.html', 'src/layouts/**/*.html', 'src/partials/**/*.html'], html);
    watch('src/css/**/*.css', css);
    watch('src/js/**/*.js', js);
}

// Build and default tasks
const build = series(parallel(html, css, js, assets));
export default series(build, serve);
