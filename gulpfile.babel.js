import gulp from 'gulp'

import './gulp/tasks/webpack'
import './gulp/tasks/postcss'
import './gulp/tasks/browserify'

gulp.task('default', ['webpack', 'postcss'])

gulp.task('watch', ['default', 'browserify:watch'], () => {
	gulp.watch('./src/css/**/*', ['postcss'])
})



