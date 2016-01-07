import path from 'path'

import gulp from 'gulp'
import {log, colors} from 'gulp-util'
import source from 'vinyl-source-stream'

import browserify from 'browserify'
import watchify from 'watchify'
import babelify from 'babelify'

const src = './src/js'
const dist = './dist'
const entry = 'index.js'

const options = {
	entries: [path.join(src, entry)],
	transform: [babelify],
	cache: {},
	packageCache: {}
}

gulp.task('browserify', () => {
	const b = browserify(options)
	return bundle(b)
})

gulp.task('browserify:watch', () => {
	const cwd = process.cwd()
	const b = watchify(browserify(options), {
		ignoreWatch: [
			'**/node_modules/**',
			new RegExp(`^${cwd}/(?!src/js)..*`)
		]
	}).on('update', () => bundle(b))
		.on('log', msg => log('[browserify]', msg))
	return bundle(b)
})


function bundle(b){
	return b.bundle()
		.on('error', handleError)
		.pipe(source(entry))
		.pipe(gulp.dest(dist))
}

function handleError(err){
	if(!err) return
	const {red} = colors
	const cwd = new RegExp(`${process.cwd()}/?`, 'g')
	const filename = err.message.replace(cwd, './')
	log(`[Browserify] ${err.name}\n\n`
		+ `${red.bold(`${err.name}: ${filename}`)}`
		+ `${err.codeFrame ? `\n${err.codeFrame}` : ''}`
	)
}