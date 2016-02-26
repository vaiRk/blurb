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
		app: path.join(__dirname, 'src', 'index.js')
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js',
		sourceMapFilename: '[name].map'
	},
	module: {
		loaders: [
			{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' }
		]
	},
	plugins: [
		new webpack.DefinePlugin({
		  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: '[name].map',
			columns: false,
			module: true
		}),
		new webpack.NoErrorsPlugin()
	].concat(prodPlugins)
}