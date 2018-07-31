import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import flushChunks from 'webpack-flush-chunks';
import { flushChunkNames } from 'react-universal-component/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cookies from 'universal-cookie';
import jwt_decode from 'jwt-decode';

import configureStore from '../src/store';
import Layout from '../src/components/Layout/Layout';
import routes from '../src/pages/Routes';
import setAuthToken from '../src/utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../src/store/actions';

export default ({ clientStats }) => (req, res) => {
  const context = {};
  const cookies = new Cookies(req.headers.cookie);

  let promises = [];
  const store = configureStore();

  if (cookies.get('jwtToken')) {
    setAuthToken(cookies.get('jwtToken'));
    // Decode token and get user info and exp
    const decoded = jwt_decode(cookies.get('jwtToken'));
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout User
      store.dispatch(logoutUser());
      // Clear current Profile
      window.location.href = '/login';
    }
  }

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
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900">
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
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
