import { postListKanim, postAvailabilityInfo } from './utils/requests';
import actionTypes from './utils/actionTypes';
import parseIfString from './utils/parser';

// Variables
const {
  ATTEMPT: LIST_KANIM_ATTEMPT,
  SUCCESS: LIST_KANIM_SUCCESS,
  INVALID: LIST_KANIM_INVALID,
} = actionTypes('LIST_KANIM');
const {
  ATTEMPT: GET_OFFICE_QUOTA_ATTEMPT,
  SUCCESS: GET_OFFICE_QUOTA_SUCCESS,
  INVALID: GET_OFFICE_QUOTA_INVALID,
} = actionTypes('GET_OFFICE_QUOTA');

const getListKanim = () => (dispatch) => {
  dispatch({ type: LIST_KANIM_ATTEMPT });

  return postListKanim().then((res) => {
    const { Success, Message, Offices } = parseIfString(res.data);

    if (Success) {
      dispatch({ type: LIST_KANIM_SUCCESS, payload: Offices });
    } else {
      throw new Error(Message);
    }
  }).catch(err => dispatch({
    type: LIST_KANIM_INVALID,
    message: err,
  }));
};

const getOfficeQuota = (token, kanimID, startDate, endDate) => (dispatch) => {
  dispatch({ type: GET_OFFICE_QUOTA_ATTEMPT, payload: kanimID });

  return postAvailabilityInfo(token, kanimID, startDate, endDate).then((response) => {
    const {
      success, data, message, errorCode,
    } = response.data;

    if (success) {
      dispatch({ type: GET_OFFICE_QUOTA_SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(err => dispatch({
    type: GET_OFFICE_QUOTA_INVALID,
    message: err,
  }));
};

export {
  LIST_KANIM_ATTEMPT,
  LIST_KANIM_SUCCESS,
  LIST_KANIM_INVALID,
  GET_OFFICE_QUOTA_ATTEMPT,
  GET_OFFICE_QUOTA_SUCCESS,
  GET_OFFICE_QUOTA_INVALID,
  getListKanim,
  getOfficeQuota,
};
