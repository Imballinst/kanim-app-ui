import auth, { defaultState } from '../auth';
import { LOGIN, LOGOUT, REFRESH } from '../../../actions/auth';

describe('auth', () => {
  // Initial state
  it('should provide the initial state', () => {
    expect(auth(undefined, {})).toEqual(defaultState);
  });

  // Login
  it('should handle LOGIN.ATTEMPT action', () => {
    const type = LOGIN.ATTEMPT;

    expect(auth(defaultState, { type }))
      .toEqual({
        ...defaultState,
        loginAttempt: true,
        message: 'Logging in...',
      });
  });

  it('should handle LOGIN.SUCCESS action', () => {
    const action = {
      type: LOGIN.SUCCESS,
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

  it('should handle LOGIN.INVALID action', () => {
    const action = {
      type: LOGIN.INVALID,
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
  it('should handle LOGOUT.SUCCESS action', () => {
    const loggedInState = auth(defaultState, {
      type: LOGIN.SUCCESS,
      payload: {
        user: 'testLogin',
        token: 'hehe',
      },
      isLoggedIn: true,
    });
    const type = LOGOUT.SUCCESS;

    expect(auth(loggedInState, { type }))
      .toEqual({
        ...loggedInState,
        isLoggedIn: false,
        token: '',
        user: undefined,
      });
  });

  // Refresh
  it('should handle REFRESH.SUCCESS action', () => {
    const afterErrorState = auth(defaultState, {
      type: LOGIN.INVALID,
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
