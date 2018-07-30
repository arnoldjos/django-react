import { REGISTER_USER, SET_CURRENT_USER } from '../actions/actionTypes';
import isEmpty from '../../utils/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  path: '/'
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        path: action.path
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
