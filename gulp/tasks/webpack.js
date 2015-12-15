import gulp from 'gulp'
import {PluginError, log} from 'gulp-util'

import webpack from 'webpack'

import webpackConfig from '../../webpack.config.babel.js'

const logConfig = {
	hash: false,
	version: false,
	chunks: false,
	chunkModules: false,
	colors: true
}

gulp.task('webpack', (callback) => {
	webpack(webpackConfig, (err, stats) => {
		if(err) throw new PluginError('webpack', err)
		log('[webpack]', stats.toString(logConfig))
		callback()
	})
})

gulp.task('webpack:watch', () => {
	webpack(Object.assign({}, webpackConfig, {watch: true}), (err, stats) => {
		if(err) throw new PluginError('webpack', err)
		log('[webpack]', stats.toString(logConfig))
	})
})