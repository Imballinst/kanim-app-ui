import { API_URL as apiUrl } from 'react-native-dotenv';
import configureMockStore from 'redux-mock-store';
import { NavigationActions } from 'react-navigation';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as authActions from '../auth';

const {
  LOGIN,
  LOGOUT,
  REFRESH,
  login,
  logout,
  refreshLoginView,
  ...untestedFunctions
} = authActions;
// Default counter to 3 because there are 3 constants
let counter = 3;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth (actions/auth)', () => {
  afterEach(() => {
    nock.cleanAll();
    counter += 1;
  });

  it('should return login action creator, async', () => {
    nock(apiUrl)
      .post('/login')
      .reply(
        200,
        { success: true, data: { user: 'halo', token: 'asdf' }},
      );

    const expectedActions = [
      { type: LOGIN.ATTEMPT, username: 'testUsername', password: 'testPassword' },
      { type: LOGIN.SUCCESS, payload: { user: 'halo', token: 'asdf' }},
      { type: NavigationActions.NAVIGATE, routeName: 'HomeStack' },
      { type: REFRESH },
    ];
    const store = mockStore({});

    return store.dispatch(login('testUsername', 'testPassword')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return logout action creator, async', () => {
    const expectedActions = [
      { type: LOGOUT.ATTEMPT },
      { type: LOGOUT.SUCCESS },
      { type: NavigationActions.NAVIGATE, routeName: 'Login' },
    ];
    const store = mockStore({});

    return store.dispatch(logout()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return refresh login action creator', () => {
    expect(refreshLoginView()).toEqual({ type: REFRESH });
  });
});

describe('auth counters (actions/auth)', () => {
  it('should test all action creators', () => {
    expect(counter).toBe(Object.keys(authActions).length);
    expect(untestedFunctions).toEqual({});
  });
});
