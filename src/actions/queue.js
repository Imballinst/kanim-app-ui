import {
  registerQueue as registerQueueRequest,
  getQueues as getQueuesRequest,
  cancelQueue as cancelQueueRequest,
} from './helpers/requests';
import actionTypes from './helpers/actionTypes';

// Variables
const REGISTER_QUEUE = actionTypes('REGISTER_QUEUE');
const GET_QUEUES = actionTypes('GET_QUEUES');
const CANCEL_QUEUE = actionTypes('CANCEL_QUEUE');

const registerQueue = (kanimID, token, count = 1, userID, tID, name, nik) => (dispatch) => {
  dispatch({ type: REGISTER_QUEUE.ATTEMPT });

  return registerQueueRequest(kanimID, token, count, userID, tID, name, nik).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: REGISTER_QUEUE.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: REGISTER_QUEUE.INVALID,
    message,
  }));
};

const getQueues = (token, userID) => (dispatch) => {
  dispatch({ type: GET_QUEUES.ATTEMPT });

  return getQueuesRequest(token, userID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: GET_QUEUES.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: GET_QUEUES.INVALID,
    message,
  }));
};

const cancelQueue = (token, userID) => (dispatch) => {
  dispatch({ type: CANCEL_QUEUE.ATTEMPT });

  return cancelQueueRequest(token, userID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: CANCEL_QUEUE.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: CANCEL_QUEUE.INVALID,
    message,
  }));
};

export {
  REGISTER_QUEUE,
  GET_QUEUES,
  CANCEL_QUEUE,
  registerQueue,
  getQueues,
  cancelQueue,
};
