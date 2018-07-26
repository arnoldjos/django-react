import { REGISTER_USER, FAIL_REGISTER } from './actionTypes';
import { getErrors, clearErrors } from './errorActions';
import axiosInstance from '../../axios';

// Register User
export const registerUser = userData => async dispatch => {
  try {
    const response = await axiosInstance.post(
      '/api/account/accounts/register/',
      userData
    );

    dispatch({
      type: REGISTER_USER,
      payload: response.data
    });
  } catch (e) {
    console.log(e.response);
    console.log(e);
    dispatch(getErrors(e.response.data));
  }
};
