import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import flushChunks from 'webpack-flush-chunks';
import { flushChunkNames } from 'react-universal-component/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../src/store';
import Layout from '../src/components/Layout/Layout';
import routes from '../src/pages/Routes';

export default ({ clientStats }) => (req, res) => {
	const context = {};

	let promises = [];
	const store = configureStore();

	routes.some(route => {
		const match = matchPath(req.path, route.path);

		if (match) {
			route.loadData ? promises.push(store.dispatch(route.loadData())) : null;
		}
	});

	const renderApp = () => {
		return renderToString(
			<Provider store={store}>
				<StaticRouter location={req.originalUrl} context={context}>
					<Layout />
				</StaticRouter>
			</Provider>
		);
	};

	const template = () => {
		const app = renderApp();
		const { js, styles } = flushChunks(clientStats, {
			chunkNames: flushChunkNames()
		});

		return `
			<html lang="en">
			<head>
				<meta charset="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<meta http-equiv="X-UA-Compatible" content="ie=edge"/>
				<title>Document</title>
				${styles}
			</head>
			<body>
				<div id="root">${app}</div>

				${js}
				<script>
					window.INITIAL_STATE = ${JSON.stringify(store.getState())}
				</script>
			</body>
			</html>
		`;
	};

	Promise.all(promises).then(() => {
		res.send(template());
	});
};
