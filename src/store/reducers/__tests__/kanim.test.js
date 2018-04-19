import kanim, { defaultState } from '../kanim';
import {
  LIST_KANIM_ATTEMPT,
  LIST_KANIM_INVALID,
  LIST_KANIM_SUCCESS,
} from '../../../actions/kanim';

describe('kanim', () => {
  // Initial state
  it('should provide the initial state', () => {
    expect(kanim(undefined, {})).toEqual(defaultState);
  });

  // Login
  it('should handle LIST_KANIM_ATTEMPT action', () => {
    const type = LIST_KANIM_ATTEMPT;

    expect(kanim(defaultState, { type }))
      .toEqual({
        ...defaultState,
        listKanimAttempt: true,
        listKanimError: '',
      });
  });

  it('should handle LIST_KANIM_SUCCESS action', () => {
    const action = {
      type: LIST_KANIM_SUCCESS,
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

  it('should handle LIST_KANIM_INVALID action', () => {
    const action = {
      type: LIST_KANIM_INVALID,
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
