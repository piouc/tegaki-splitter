import gulp from 'gulp'
import sourcemaps from 'gulp-sourcemaps'
import postcss from 'gulp-postcss'

import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

gulp.task('postcss', () => {
	return gulp.src('src/css/index.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer, postcssImport, postcssNested]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'))
})