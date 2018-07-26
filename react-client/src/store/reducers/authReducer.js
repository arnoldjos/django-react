import { REGISTER_USER, SUCCESS_REGISTER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: '',
  path: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        path: action.path
      };
    default:
      return state;
  }
};

export default reducer;
