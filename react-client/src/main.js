import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';

import configureStore from './store';

const store = configureStore(window.INITIAL_STATE);

import './main.scss';

const render = Component => {
	ReactDOM.hydrate(
		<Provider store={store}>
			<AppContainer>
				<Component />
			</AppContainer>
		</Provider>,
		document.getElementById('root')
	);
};
render(App);

if (module.hot) {
	module.hot.accept('./App', () => {
		const NewApp = require('./App').default;
		render(NewApp);
	});
}
