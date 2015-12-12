import gulp from 'gulp'
import {PluginError, log} from 'gulp-util'
import sourcemaps from 'gulp-sourcemaps'

import webpack from 'webpack'
import postcss from 'gulp-postcss'

import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'

import webpackConfig from './webpack.config.babel.js'


const logConfig = {
	hash: false,
	version: false,
	chunks: false,
	chunkModules: false,
	colors: true
}


gulp.task('default', ['webpack', 'postcss'])


gulp.task('watch', ['default'], () => {
	gulp.watch('./src/js/**/*', ['webpack'])
	gulp.watch('./src/css/**/*', ['postcss'])
	
})


gulp.task('webpack', (callback) => {
	webpack(webpackConfig, (err, stats) => {
		if(err)throw new PluginError('webpack', err)
		log('[webpack]', stats.toString(logConfig))
		callback()
	})
})


gulp.task('postcss', () => {
	return gulp.src('src/css/index.css')
		.pipe(sourcemaps.init())
		.pipe(postcss([autoprefixer, postcssImport, postcssNested]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/'))
})
