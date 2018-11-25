import kanim, { defaultState } from '../kanim';
import { GET_OFFICES } from '../../../actions/kanim';

describe('kanim', () => {
  // Initial state
  it('should provide the initial state', () => {
    expect(kanim(undefined, {})).toEqual(defaultState);
  });

  // Login
  it('should handle GET_OFFICES.ATTEMPT action', () => {
    const type = GET_OFFICES.ATTEMPT;

    expect(kanim(defaultState, { type }))
      .toEqual({
        ...defaultState,
        getOfficesAttempt: true,
        getOfficesError: '',
      });
  });

  it('should handle GET_OFFICES.SUCCESS action', () => {
    const action = {
      type: GET_OFFICES.SUCCESS,
      payload: ['officeA', 'officeB'],
    };

    expect(kanim(defaultState, action))
      .toEqual({
        ...defaultState,
        getOfficesAttempt: false,
        getOfficesError: '',
        offices: ['officeA', 'officeB'],
      });
  });

  it('should handle GET_OFFICES.INVALID action', () => {
    const action = {
      type: GET_OFFICES.INVALID,
      message: 'This is an error message.',
    };

    expect(kanim(defaultState, action))
      .toEqual({
        ...defaultState,
        getOfficesError: 'This is an error message.',
        getOfficesAttempt: false,
      });
  });
});
