import axios from 'axios';

import { GET_LANDING_DATA, SET_LOADING } from './actionTypes';

export const fetchLanding = () => async dispatch => {
	const response = await axios.get(
		'https://jsonplaceholder.typicode.com/posts'
	);

	dispatch({
		type: GET_LANDING_DATA,
		payload: response.data
	});
};
