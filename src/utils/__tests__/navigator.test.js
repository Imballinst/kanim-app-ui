import * as navigatorFunctions from '../navigator';

const {
  getParentOfLastRoute,
  getLastRoute,
  ...untestedFunctions
} = navigatorFunctions;
// Default counter to 5 because there are 5 constants
let counter = 0;

describe('navigator (utils/navigator)', () => {
  afterEach(() => {
    counter += 1;
  });

  const state = {
    index: 1,
    routes: [{}, {
      index: 2,
      routes: [{}, {}, {
        index: 0,
        routes: [{ key: 'xd' }]
      }]
    }]
  };

  it('should dig deep with getParentOfLastRoute', () => {
    expect(getParentOfLastRoute(state)).toEqual({ index: 0, routes: [{ key: 'xd' }]});
  });

  it('should get last route with getLastRoute', () => {
    expect(getLastRoute(state)).toEqual({ key: 'xd' });
  });
});

describe('navigator counters (utils/navigator)', () => {
  it('should test all action creators', () => {
    expect(counter).toBe(Object.keys(navigatorFunctions).length);
    expect(untestedFunctions).toEqual({});
  });
});
