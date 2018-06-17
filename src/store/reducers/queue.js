import { LOGIN } from '../../actions/auth';
import {
  REGISTER_QUEUE,
  GET_QUEUES,
  CANCEL_QUEUE,
} from '../../actions/queue';

const defaultState = {
  registerQueueAttempt: false,
  registerQueueError: '',
  registerQueueResult: undefined,
  getQueueAttempt: false,
  getQueueError: '',
  queues: [],
  queuesUsed: 0,
  isQueueExist: false,
  cancelQueueAttempt: false,
  cancelQueueError: '',
  cancelQueueResult: undefined,
};

const queue = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      return { ...defaultState };
    }
    case REGISTER_QUEUE.ATTEMPT: {
      return {
        ...state,
        registerQueueAttempt: true,
        registerQueueError: '',
      };
    }
    case REGISTER_QUEUE.SUCCESS: {
      return {
        ...state,
        registerQueueResult: action.payload,
        registerQueueAttempt: false,
      };
    }
    case REGISTER_QUEUE.INVALID: {
      return {
        ...state,
        registerQueueAttempt: false,
        registerQueueError: action.message,
      };
    }
    case GET_QUEUES.ATTEMPT: {
      return {
        ...state,
        getQueueAttempt: true,
        getQueueError: '',
        isQueueExist: false,
      };
    }
    case GET_QUEUES.SUCCESS: {
      const { queues, queuesUsed } = action.payload;
      const isQueueExist = queues.length > 0;

      return {
        ...state,
        queues,
        getQueueAttempt: false,
        isQueueExist,
        queuesUsed,
      };
    }
    case GET_QUEUES.INVALID: {
      return {
        ...state,
        getQueueAttempt: false,
        getQueueError: action.message,
      };
    }
    case CANCEL_QUEUE.ATTEMPT: {
      return {
        ...state,
        cancelQueueAttempt: true,
        cancelQueueError: '',
      };
    }
    case CANCEL_QUEUE.SUCCESS: {
      return {
        ...state,
        cancelQueueResult: action.payload,
        cancelQueueAttempt: false,
      };
    }
    case CANCEL_QUEUE.INVALID: {
      return {
        ...state,
        cancelQueueAttempt: false,
        cancelQueueError: action.message,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default queue;
