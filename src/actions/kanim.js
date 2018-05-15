import {
  getOffices,
  getOfficeQuota as getOfficeQuotaRequest,
  checkOfficeQuota,
} from './utils/requests';
import actionTypes from './utils/actionTypes';

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
const {
  ATTEMPT: CONFIRM_QUOTA_ATTEMPT,
  SUCCESS: CONFIRM_QUOTA_SUCCESS,
  INVALID: CONFIRM_QUOTA_INVALID,
} = actionTypes('CONFIRM_QUOTA');

const getListKanim = token => (dispatch) => {
  dispatch({ type: LIST_KANIM_ATTEMPT });

  return getOffices(token).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: LIST_KANIM_SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(err => dispatch({
    type: LIST_KANIM_INVALID,
    message: err,
  }));
};

const getOfficeQuota = (token, kanimID, startDate, endDate) => (dispatch) => {
  dispatch({ type: GET_OFFICE_QUOTA_ATTEMPT, payload: kanimID });

  return getOfficeQuotaRequest(token, kanimID, startDate, endDate)
    .then((res) => {
      const {
        success, data, message, errorCode,
      } = res.data;

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

const confirmQuotaAvailability = (token, kanimID, date, startHour, endHour) => (dispatch) => {
  dispatch({ type: CONFIRM_QUOTA_ATTEMPT });

  return checkOfficeQuota(token, kanimID, date, startHour, endHour)
    .then((res) => {
      const {
        success, data, message, errorCode,
      } = res.data;

      // Continue later
      if (success) {
        dispatch({ type: CONFIRM_QUOTA_SUCCESS, payload: data });
      } else {
        throw new Error(`${errorCode} ${message}`);
      }
    }).catch(err => dispatch({
      type: CONFIRM_QUOTA_INVALID,
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
  CONFIRM_QUOTA_ATTEMPT,
  CONFIRM_QUOTA_SUCCESS,
  CONFIRM_QUOTA_INVALID,
  getListKanim,
  getOfficeQuota,
  confirmQuotaAvailability,
};
