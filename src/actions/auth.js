import { NavigationActions } from 'react-navigation';
import { login as requestLogin } from './utils/requests';
import actionTypes from './utils/actionTypes';

// Variables
const LOGIN = actionTypes('LOGIN');
const LOGOUT = actionTypes('LOGOUT');
const REFRESH = 'REFRESH';

// Actions
const refreshLoginView = () => ({ type: REFRESH });
const login = (username, password) => (dispatch) => {
  dispatch({
    type: LOGIN.ATTEMPT,
    username,
    password,
  });

  if (password !== '') {
    const promise = requestLogin(username, password);

    return promise.then((res) => {
      const {
        success, data, message, errorCode,
      } = res.data;

      if (success) {
        const { token, user } = data;

        dispatch({ type: LOGIN.SUCCESS, payload: { token, user } });
        dispatch(NavigationActions.navigate({ routeName: 'HomeStack' }));
        dispatch({ type: REFRESH });
      } else {
        throw new Error(`${errorCode} ${message}`);
      }
    }).catch(({ message }) => dispatch({
      type: LOGIN.INVALID,
      message,
    }));
  }

  return dispatch({
    type: LOGIN.INVALID,
    message: 'Password is empty!',
  });
};

const logout = () => (dispatch) => {
  const promise = new Promise((resolve) => {
    dispatch({ type: LOGOUT.ATTEMPT });

    // Pretend that we're logging out within 0.25 second
    setTimeout(() => {
      resolve({ type: LOGOUT.SUCCESS });
    }, 250);
  });

  return promise.then(obj => dispatch(obj))
    .then(() => dispatch(NavigationActions.navigate({ routeName: 'Login' })))
    .then(() => setTimeout(() => dispatch(refreshLoginView()), 500));
};

export {
  LOGIN,
  LOGOUT,
  REFRESH,
  login,
  logout,
  refreshLoginView,
};
