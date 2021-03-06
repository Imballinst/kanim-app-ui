import { login as httpLogin } from './requests';
import { LOGIN, LOGOUT } from '../actionTypes';

// Actions
const login = (username, password) => async dispatch => {
  dispatch({
    type: LOGIN.ATTEMPT,
    username,
    password
  });

  try {
    // Throw new error if empty
    if (password === '') {
      throw new Error('Password is empty!');
    }

    const { data } = await httpLogin(username, password);
    const { success, data: responseData, message, errorCode } = data;

    if (success) {
      const { token, user } = responseData;

      dispatch({ type: LOGIN.SUCCESS, payload: { token, user } });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: LOGIN.FAILED,
      message: errorMessage
    });
  }
};

const logout = () => dispatch => {
  dispatch({ type: LOGOUT.ATTEMPT });

  // Pretend that we're logging out within 0.25 second
  setTimeout(() => {
    dispatch({ type: LOGOUT.SUCCESS });
  }, 250);
};

export { login, logout };
