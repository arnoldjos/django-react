const path = require('path');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
	name: 'client',
	mode: 'development',
	entry: {
		vendor: ['react', 'react-dom'],
		main: [
			'react-hot-loader/patch',
			'babel-runtime/regenerator',
			'webpack-hot-middleware/client?reload=true',
			'./src/main.js'
		]
	},
	output: {
		filename: '[name]-bundle.js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/'
	},
	devServer: {
		contentBase: 'dist',
		overlay: true,
		hot: true,
		stats: {
			colors: true
		}
	},
	devtool: 'source-map',
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
				use: [
					{ loader: ExtractCssChunks.loader },
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: ExtractCssChunks.loader
					},
					{
						loader: 'css-loader'
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
				test: /\.(jpg|gif|png)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
		new ExtractCssChunks({ hot: true }),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development'),
				WEBPACK: true
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
};
