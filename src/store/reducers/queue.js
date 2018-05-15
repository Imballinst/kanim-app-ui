import {
  REGISTER_QUEUE_ATTEMPT,
  REGISTER_QUEUE_SUCCESS,
  REGISTER_QUEUE_INVALID,
} from '../../actions/queue';

const defaultState = {
  registerQueueAttempt: false,
  registerQueueError: '',
  registerQueueResult: undefined,
};

const queue = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTER_QUEUE_ATTEMPT: {
      return {
        ...state,
        registerQueueAttempt: true,
        registerQueueError: '',
      };
    }
    case REGISTER_QUEUE_SUCCESS: {
      return {
        ...state,
        registerQueueResult: action.payload,
        registerQueueAttempt: false,
      };
    }
    case REGISTER_QUEUE_INVALID: {
      return {
        ...state,
        registerQueueAttempt: false,
        registerQueueError: action.message,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default queue;
