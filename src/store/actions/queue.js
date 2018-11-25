import {
  registerQueue as httpRegisterQueue,
  getQueues as httpGetQueues,
  deleteQueue as httpDeleteQueue
} from './requests';
import { REGISTER_QUEUE, GET_QUEUES, CANCEL_QUEUE } from '../actionTypes';

const registerQueue = (kanimID, token, count = 1, userID, tID, name, nik) => async dispatch => {
  dispatch({ type: REGISTER_QUEUE.ATTEMPT });

  try {
    const { data } = await httpRegisterQueue(kanimID, token, count, userID, tID, name, nik);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: REGISTER_QUEUE.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: REGISTER_QUEUE.INVALID,
      message: errorMessage
    });
  }
};

const getQueues = (token, userID) => async dispatch => {
  dispatch({ type: GET_QUEUES.ATTEMPT });

  try {
    const { data } = await httpGetQueues(token, userID);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: GET_QUEUES.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: GET_QUEUES.INVALID,
      message: errorMessage
    });
  }
};

const deleteQueue = (token, userID) => dispatch => {
  dispatch({ type: CANCEL_QUEUE.ATTEMPT });

  try {
    const { data } = await httpDeleteQueue(token, userID);
    const { success, data, message, errorCode } = res.data;

    if (success) {
      dispatch({ type: CANCEL_QUEUE.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: CANCEL_QUEUE.INVALID,
      message: errorMessage
    });
  }
};

export { registerQueue, getQueues, deleteQueue };
