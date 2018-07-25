const path = require('path');
const webpack = require('webpack');
const externals = require('./node-externals');

module.exports = {
	name: 'server',
	target: 'node',
	externals,
	entry: './server/renderer.js',
	mode: 'production',
	output: {
		filename: 'prod-server-bundle.js',
		path: path.resolve(__dirname, '../build'),
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: {
					loader: 'css-loader',
					options: {
						minimize: true
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(jpg|png|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							emitFile: false
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		})
	]
};
