import gulp from 'gulp'

import './gulp/tasks/postcss'
import './gulp/tasks/browserify'

gulp.task('default', ['browserify', 'postcss'])

gulp.task('watch', ['default', 'browserify:watch'], () => {
	gulp.watch('./src/css/**/*', ['postcss'])
})
