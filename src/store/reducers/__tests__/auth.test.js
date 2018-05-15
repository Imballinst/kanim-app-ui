import auth, { defaultState } from '../auth';
import {
  LOGIN_ATTEMPT,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  REFRESH,
} from '../../../actions/auth';

describe('auth', () => {
  // Initial state
  it('should provide the initial state', () => {
    expect(auth(undefined, {})).toEqual(defaultState);
  });

  // Login
  it('should handle LOGIN_ATTEMPT action', () => {
    const type = LOGIN_ATTEMPT;

    expect(auth(defaultState, { type }))
      .toEqual({
        ...defaultState,
        loginAttempt: true,
        message: 'Logging in...',
      });
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: { user: 'testLogin', token: 'token' },
      loginAttempt: false,
    };

    expect(auth(defaultState, action))
      .toEqual({
        ...defaultState,
        isLoggedIn: true,
        token: 'token',
        user: 'testLogin',
      });
  });

  it('should handle LOGIN_INVALID action', () => {
    const action = {
      type: LOGIN_INVALID,
      message: 'This is an error message.',
    };

    expect(auth(defaultState, action))
      .toEqual({
        ...defaultState,
        isError: true,
        message: 'This is an error message.',
        loginAttempt: false,
      });
  });

  // Logout
  it('should handle LOGOUT_SUCCESS action', () => {
    const loggedInState = auth(defaultState, {
      type: LOGIN_SUCCESS,
      payload: {
        user: 'testLogin',
        token: 'hehe',
      },
      isLoggedIn: true,
    });
    const type = LOGOUT_SUCCESS;

    expect(auth(loggedInState, { type }))
      .toEqual({
        ...loggedInState,
        isLoggedIn: false,
        token: '',
        user: undefined,
      });
  });

  // Refresh
  it('should handle REFRESH_SUCCESS action', () => {
    const afterErrorState = auth(defaultState, {
      type: LOGIN_INVALID,
      message: 'This is an error message.',
    });
    const type = REFRESH;

    expect(auth(afterErrorState, { type }))
      .toEqual({
        ...afterErrorState,
        message: '',
        isError: false,
      });
  });
});
