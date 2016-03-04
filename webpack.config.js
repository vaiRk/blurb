'use strict';

var webpack = require('webpack');
var path = require('path');

var prodPlugins = [];

if (process.env.NODE_ENV === 'production') {
	prodPlugins = prodPlugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				dead_code: true,
				screw_ie8: true,
				drop_debugger: true
			}
		})
	]);
}

module.exports = {
	context: __dirname,
	debug: process.env.NODE_ENV === 'development',
	entry: {
		app: [
			'webpack-dev-server/client?http://0.0.0.0:8000', // WebpackDevServer host and port
			'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
			path.join(__dirname, 'src', 'index.js')
		]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		sourceMapFilename: '[name].map'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel' }
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[name].map',
			columns: false,
			module: true
		}),
		new webpack.NoErrorsPlugin()
	].concat(prodPlugins),
	devServer: {
		port: process.env.PORT || 8000,
		hot: true,
		contentBase: path.join(__dirname, 'src'),
		historyApiFallback: true,
		quiet: false,
		noInfo: false,
		stats: {
			assets: true,
			colors: true,
			version: false,
			hash: false,
			timings: true,
			chunks: false,
			chunkModules: false
		}
	}
}