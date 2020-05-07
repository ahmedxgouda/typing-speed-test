// jshint esversion: 6
// Declaring
import {watch, src, dest, series} from 'gulp';
import del  from 'del';
import imagemin  from 'gulp-imagemin';
import uglify  from 'gulp-terser';
import cleanCss  from 'gulp-clean-css';
import usemin  from 'gulp-usemin';
import htmlmin  from 'gulp-htmlmin';
import rev  from 'gulp-rev';
import flatmap  from 'gulp-flatmap';
// functions
function clean() {
    return del(['dist']);
}
function image_min() {
    return src('./img/*.{png,jpg,gif,ico,svg}')
        .pipe(imagemin(
            { optimizationLevel: 3, progressive: true, interlaced: true }
        ))
        .pipe(dest('dist/img'));
}
function use_min() {
    return src('./*.html')
    .pipe(flatmap((stream, file) => {
        return stream
        .pipe(usemin({
            css: [cleanCss(), rev()],
            html: [() => { return htmlmin({ collapseWhitespace: true }); }],
            js: [uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }));
    }))
    .pipe(dest('./dist'));    
}
// Exports Commands
const _clean = clean;
export {_clean as clean};
const _imagemin = image_min;
export {_imagemin as imagemin};
const _usemin = use_min;
export {_usemin as usemin};
const build = series(clean, image_min, use_min);
export {build as build};