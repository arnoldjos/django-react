import { GET_LANDING_DATA, SET_LOADING } from '../actions/actionTypes';
const initalState = {
	loading: false
};

const reducer = (state = initalState, action) => {
	switch (action.type) {
		case GET_LANDING_DATA:
			return {
				...initalState,
				data: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
