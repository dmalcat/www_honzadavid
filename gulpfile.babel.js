'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify-es';
import rename from 'gulp-rename';
import del from 'del';

sass.compiler = require('node-sass');

const assetsPath = '';

const paths = {
	styles: {
		main: assetsPath + 'scss/main.scss',
		src: assetsPath + 'scss/*.scss',
		dest: assetsPath + 'dist/css/'
	}
};

export const clean = () => del([ assetsPath + '/dist' ]);

export function styles() {
	return gulp.src(paths.styles.main)
		.pipe(sass())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: 'style',
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.styles.dest));
}

function watchFiles() {
	gulp.watch(paths.styles.src, styles);
}

export { watchFiles as watch };

const build = gulp.series(clean, gulp.parallel(styles));

export default build;
