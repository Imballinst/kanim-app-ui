import {
  LOGIN_ATTEMPT,
  LOGIN_INVALID,
  LOGIN_SUCCESS,
  LOGOUT_ATTEMPT,
  LOGOUT_SUCCESS,
  REFRESH,
  login,
  logout,
  refreshLoginView,
} from '../auth';
import configureMockStore from 'redux-mock-store';
import { NavigationActions } from 'react-navigation';
import thunk from 'redux-thunk';
import nock from 'nock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth', () => {
  afterAll(() => nock.cleanAll());

  it('should return login action creator, async', () => {
    const scope = nock('https://antrian.imigrasi.go.id')
      .post('/rest/Authentication.jsp')
      .reply(
        200,
        { Success: true, Message: { user: 'halo' }, Token: 'asdf' },
      );

    const expectedActions = [
      { type: LOGIN_ATTEMPT, username: 'testUsername', password: 'testPassword' },
      { type: LOGIN_SUCCESS, payload: { user: 'halo' }, token: 'asdf' },
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
      { type: LOGOUT_ATTEMPT },
      { type: LOGOUT_SUCCESS },
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
