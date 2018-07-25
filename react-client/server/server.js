import express from 'express';

const expressStaticGzip = require('express-static-gzip');
import webpack from 'webpack';
import webpackHotServerMiddleware from 'webpack-hot-server-middleware';

import configDevClient from '../config/webpack.dev-client.js';
import configDevServer from '../config/webpack.dev-server.js';
import configProdClient from '../config/webpack.prod-client.js';
import configProdServer from '../config/webpack.prod-server.js';

const node_env = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
let isBuilt = false;
let server = express();

const done = () => {
	if (isBuilt) return;

	server.listen(PORT, () => {
		isBuilt = true;
		console.log(
			`Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
		);
	});
};

if (node_env === 'development') {
	const compiler = webpack([configDevClient, configDevServer]);

	const clientCompiler = compiler.compilers[0];
	const serverCompiler = compiler.compilers[1];

	const webpackDevMiddleware = require('webpack-dev-middleware')(
		compiler,
		configDevClient.devServer
	);

	const webpackHotMiddlware = require('webpack-hot-middleware')(
		clientCompiler,
		configDevClient.devServer
	);

	server.use(webpackDevMiddleware);
	server.use(webpackHotMiddlware);
	server.use(webpackHotServerMiddleware(compiler));
	console.log('Middleware enabled');
	done();
} else {
	webpack([configProdClient, configProdServer]).run((err, stats) => {
		const render = require('../build/prod-server-bundle.js').default;
		console.log(
			stats.toString({
				colors: true
			})
		);
		const clientStats = stats.toJson().children[0];
		server.use(
			expressStaticGzip('dist', {
				enableBrotli: true
			})
		);
		server.use(render({ clientStats }));
		done();
	});
}
