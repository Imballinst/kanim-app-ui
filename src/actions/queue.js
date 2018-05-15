import { registerQueue as registerQueueRequest } from './utils/requests';
import actionTypes from './utils/actionTypes';

// Variables
const {
  ATTEMPT: REGISTER_QUEUE_ATTEMPT,
  SUCCESS: REGISTER_QUEUE_SUCCESS,
  INVALID: REGISTER_QUEUE_INVALID,
} = actionTypes('REGISTER_QUEUE');

const registerQueue = (kanimID, token, count, userID, tID, name, nik) => (dispatch) => {
  dispatch({ type: REGISTER_QUEUE_ATTEMPT });

  return registerQueueRequest(kanimID, token, count, userID, tID, name, nik).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: REGISTER_QUEUE_SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(err => dispatch({
    type: REGISTER_QUEUE_INVALID,
    message: err,
  }));
};

export {
  REGISTER_QUEUE_ATTEMPT,
  REGISTER_QUEUE_SUCCESS,
  REGISTER_QUEUE_INVALID,
  registerQueue,
};
