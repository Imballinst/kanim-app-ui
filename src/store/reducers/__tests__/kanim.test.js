import kanim, { defaultState } from '../kanim';
import { LIST_KANIM } from '../../../actions/kanim';

describe('kanim', () => {
  // Initial state
  it('should provide the initial state', () => {
    expect(kanim(undefined, {})).toEqual(defaultState);
  });

  // Login
  it('should handle LIST_KANIM.ATTEMPT action', () => {
    const type = LIST_KANIM.ATTEMPT;

    expect(kanim(defaultState, { type }))
      .toEqual({
        ...defaultState,
        listKanimAttempt: true,
        listKanimError: '',
      });
  });

  it('should handle LIST_KANIM.SUCCESS action', () => {
    const action = {
      type: LIST_KANIM.SUCCESS,
      payload: ['officeA', 'officeB'],
    };

    expect(kanim(defaultState, action))
      .toEqual({
        ...defaultState,
        listKanimAttempt: false,
        listKanimError: '',
        offices: ['officeA', 'officeB'],
      });
  });

  it('should handle LIST_KANIM.INVALID action', () => {
    const action = {
      type: LIST_KANIM.INVALID,
      message: 'This is an error message.',
    };

    expect(kanim(defaultState, action))
      .toEqual({
        ...defaultState,
        listKanimError: 'This is an error message.',
        listKanimAttempt: false,
      });
  });
});
