import gulp from 'gulp'

import './gulp/tasks/webpack'
import './gulp/tasks/postcss'

gulp.task('default', ['webpack', 'postcss'])

gulp.task('watch', ['default'], () => {
	gulp.watch('./src/js/**/*', ['webpack'])
	gulp.watch('./src/css/**/*', ['postcss'])
})



