import {
  REGISTER_QUEUE,
  GET_QUEUES,
  CANCEL_QUEUE,
} from '../../actions/queue';

const defaultState = {
  registerQueueAttempt: false,
  registerQueueError: '',
  registerQueueResult: undefined,
  listQueueAttempt: false,
  listQueueError: '',
  isQueueExist: false,
  queues: [],
  cancelQueueAttempt: false,
  cancelQueueError: '',
  cancelQueueResult: undefined,
};

const queue = (state = defaultState, action) => {
  switch (action.type) {
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
        listQueueAttempt: true,
        listQueueError: '',
      };
    }
    case GET_QUEUES.SUCCESS: {
      const isQueueExist = action.payload.length > 0;

      return {
        ...state,
        queues: action.payload,
        isQueueExist,
        listQueueAttempt: false,
      };
    }
    case GET_QUEUES.INVALID: {
      return {
        ...state,
        listQueueAttempt: false,
        listQueueError: action.message,
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
