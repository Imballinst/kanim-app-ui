import { API_URL as apiUrl } from 'react-native-dotenv';
import configureMockStore from 'redux-mock-store';
import { NavigationActions } from 'react-navigation';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as kanimActions from '../kanim';

const {
  GET_OFFICES,
  GET_OFFICE_QUOTA,
  CHECK_QUOTA,
  getOffices,
  getOffice,
  confirmOfficeQuota,
  confirmQuotaSync,
  ...untestedFunctions
} = kanimActions;
let counter = 3;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth', () => {
  afterEach(() => {
    nock.cleanAll();
    counter += 1;
  });

  it('should return get offices action creator, async', () => {
    nock(apiUrl)
      .get('/offices?SearchKeyWord=')
      .reply(200, {
        success: true,
        data: [
          { MO_ID: 1, MO_NAME: 'Kanim 1' },
          { MO_ID: 2, MO_NAME: 'Kanim 2' },
          { MO_ID: 3, MO_NAME: 'Kanim 3' }
        ]
      });

    const expectedActions = [
      { type: GET_OFFICES.ATTEMPT },
      {
        type: GET_OFFICES.SUCCESS,
        payload: [
          { MO_ID: 1, MO_NAME: 'Kanim 1' },
          { MO_ID: 2, MO_NAME: 'Kanim 2' },
          { MO_ID: 3, MO_NAME: 'Kanim 3' }
        ]
      }
    ];
    const store = mockStore({});

    return store.dispatch(getOffices('token')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return get office action creator, async', () => {
    nock(apiUrl)
      .get('/offices/1?startDate=1234&endDate=1234')
      .reply(200, { success: true, data: { MO_ID: 1, MO_NAME: 'Kanim 1' } });

    const expectedActions = [
      { type: GET_OFFICE_QUOTA.ATTEMPT, payload: 1 },
      { type: GET_OFFICE_QUOTA.SUCCESS, payload: { MO_ID: 1, MO_NAME: 'Kanim 1' } }
    ];
    const store = mockStore({});

    return store.dispatch(getOffice('token', 1, 1234, 1234)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return confirm office quota action creator, async', () => {
    nock(apiUrl)
      .post('/offices/1/check')
      .reply(200, { success: true, data: { timingID: 12345 } });

    const expectedActions = [
      { type: CHECK_QUOTA.ATTEMPT },
      {
        type: CHECK_QUOTA.SUCCESS,
        payload: {
          timingID: 12345,
          kanimID: 1,
          date: 1234,
          startHour: 'startHr',
          endHour: 'endHr'
        }
      }
    ];
    const store = mockStore({});

    return store.dispatch(confirmOfficeQuota('token', 1, 1234, 'startHr', 'endHr')).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return confirm office quota action creator, sync', () => {
    expect(confirmQuotaSync('sample_payload')).toEqual({
      type: CHECK_QUOTA.SUCCESS,
      payload: 'sample_payload'
    });
  });
});

describe('kanim counters (actions/kanim)', () => {
  it('should test all action creators', () => {
    expect(counter).toBe(Object.keys(kanimActions).length);
    expect(untestedFunctions).toEqual({});
  });
});
