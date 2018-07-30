import jwt_decode from 'jwt-decode';

import { REGISTER_USER, SET_CURRENT_USER } from './actionTypes';
import { getErrors } from './errorActions';
import axiosInstance from '../../axios';
import setAuthToken from '../../utils/setAuthToken';

// Register User
export const registerUser = (userData, history) => async dispatch => {
  try {
    const response = await axiosInstance.post(
      '/api/account/accounts/register/',
      userData
    );

    dispatch({
      type: REGISTER_USER,
      payload: response.data
    });
    history.push('/signin');
  } catch (e) {
    dispatch(getErrors(e.response.data));
  }
};

export const loginUser = (user, history) => async dispatch => {
  try {
    const response = await axiosInstance.post(
      '/api/account/accounts/login/',
      user
    );
    const { token } = response.data;
    await localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    dispatch({ type: SET_CURRENT_USER, payload: { user: response.data.user } });
    history.push('/dashboard');
  } catch (e) {
    dispatch(getErrors(e.response.data));
  }
};

export const logoutUser = action => async dispatch => {
  await localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
