import { NavigationActions } from 'react-navigation';
import { postLogin } from './utils/requests';
import actionTypes from './utils/actionTypes';
import parseIfString from './utils/parser';

// Variables
const {
  ATTEMPT: LOGIN_ATTEMPT,
  SUCCESS: LOGIN_SUCCESS,
  INVALID: LOGIN_INVALID,
} = actionTypes('LOGIN');
const {
  ATTEMPT: LOGOUT_ATTEMPT,
  SUCCESS: LOGOUT_SUCCESS,
} = actionTypes('LOGOUT');
const REFRESH = 'REFRESH';

// Actions
const refreshLoginView = () => ({ type: REFRESH });
const login = (username, password) => (dispatch) => {
  dispatch({
    type: LOGIN_ATTEMPT,
    username,
    password,
  });

  if (password !== '') {
    const promise = postLogin(username, password);

    return promise.then((res) => {
      const { Success, Message, Token } = parseIfString(res.data);

      if (Success) {
        const user = parseIfString(Message);

        dispatch({ type: LOGIN_SUCCESS, payload: user, token: Token });
        dispatch(NavigationActions.navigate({ routeName: 'HomeStack' }));
        dispatch({ type: REFRESH });
      } else {
        throw new Error(Message);
      }
    }).catch(({ message }) => dispatch({
      type: LOGIN_INVALID,
      message,
    }));
  }

  return dispatch({
    type: LOGIN_INVALID,
    message: 'Password is empty!',
  });
};

const logout = () => (dispatch) => {
  const promise = new Promise((resolve) => {
    dispatch({ type: LOGOUT_ATTEMPT });

    // Pretend that we're logging out within 0.25 second
    setTimeout(() => {
      resolve({ type: LOGOUT_SUCCESS });
    }, 250);
  });

  return promise.then(obj => dispatch(obj))
    .then(() => dispatch(NavigationActions.navigate({ routeName: 'Login' })))
    .then(() => setTimeout(() => dispatch(refreshLoginView()), 500));
};

export {
  LOGIN_ATTEMPT,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  REFRESH,
  login,
  logout,
  refreshLoginView,
};
