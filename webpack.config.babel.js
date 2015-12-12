import webpack from 'webpack'

export default {
	context: __dirname + '/src/js',
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'index.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},
	resolve: {
		alias: {},
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js']
	},
	devtool: 'inline-source-map',
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]
}