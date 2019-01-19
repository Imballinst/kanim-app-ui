import { LOGIN, LOGOUT, REFRESH } from '../actionTypes';

// Default state
const defaultState = {
  isLoggedIn: false,
  user: undefined,
  token: '',
  loginAttempt: false,
  logoutAttempt: false,
  isError: false,
  message: ''
};

const getDefaultState = () => {
  const authData = window.localStorage.getItem('authData');

  if (authData) {
    const { user, token } = JSON.parse(authData);

    defaultState.isLoggedIn = true;
    defaultState.user = user;
    defaultState.token = token;
  }

  return defaultState;
};

const auth = (state = getDefaultState(), action) => {
  switch (action.type) {
    case LOGIN.ATTEMPT: {
      return {
        ...state,
        message: 'Logging in...',
        loginAttempt: true,
        isError: false
      };
    }
    case LOGIN.SUCCESS: {
      const { user, token } = action.payload;

      return {
        ...state,
        isLoggedIn: true,
        message: '',
        user,
        token,
        loginAttempt: false,
        isError: false
      };
    }
    case LOGIN.INVALID: {
      return {
        ...state,
        message: action.message,
        loginAttempt: false,
        isError: true
      };
    }
    case LOGOUT.ATTEMPT: {
      return {
        ...state,
        logoutAttempt: true
      };
    }
    case LOGOUT.SUCCESS: {
      return {
        ...state,
        logoutAttempt: false,
        isLoggedIn: false,
        token: '',
        user: undefined
      };
    }
    case REFRESH: {
      return {
        ...state,
        message: '',
        isError: false
      };
    }
    default:
      return state;
  }
};

export { defaultState };
export default auth;
