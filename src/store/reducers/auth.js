import {
  LOGIN_ATTEMPT,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  REFRESH,
} from '../../actions/auth';

const defaultState = {
  isLoggedIn: false,
  user: undefined,
  token: '',
  loginAttempt: false,
  logoutAttempt: false,
  isError: false,
  message: '',
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT: {
      return {
        ...state,
        message: 'Logging in...',
        loginAttempt: true,
        isError: false,
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        message: '',
        user: action.payload,
        token: action.token,
        loginAttempt: false,
        isError: false,
      };
    }
    case LOGIN_INVALID: {
      return {
        ...state,
        message: action.message,
        loginAttempt: false,
        isError: true,
      };
    }
    case LOGOUT_ATTEMPT: {
      return {
        ...state,
        logoutAttempt: true,
      };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutAttempt: false,
        isLoggedIn: false,
        token: '',
        user: undefined,
      };
    }
    case REFRESH: {
      return {
        ...state,
        message: '',
        isError: false,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default auth;
