import {
  getOffices as getOfficesRequest,
  getOfficeQuota as getOfficeQuotaRequest,
  confirmOfficeQuota as confirmOfficeQuotaRequest,
} from './helpers/requests';
import actionTypes from './helpers/actionTypes';

// Variables
const GET_OFFICES = actionTypes('GET_OFFICES');
const GET_OFFICE_QUOTA = actionTypes('GET_OFFICE_QUOTA');
const CONFIRM_QUOTA = actionTypes('CONFIRM_QUOTA');

// Action creators
const confirmQuotaSync = payload => ({
  type: CONFIRM_QUOTA.SUCCESS,
  payload,
});

// Async actions
const getOffices = token => (dispatch) => {
  dispatch({ type: GET_OFFICES.ATTEMPT });

  return getOfficesRequest(token).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: GET_OFFICES.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: GET_OFFICES.INVALID,
    message,
  }));
};

const getOffice = (token, kanimID, startDate, endDate) => (dispatch) => {
  dispatch({ type: GET_OFFICE_QUOTA.ATTEMPT, payload: kanimID });

  return getOfficeQuotaRequest(token, kanimID, startDate, endDate)
    .then((res) => {
      const {
        success, data, message, errorCode,
      } = res.data;

      if (success) {
        dispatch({ type: GET_OFFICE_QUOTA.SUCCESS, payload: data });
      } else {
        throw new Error(`${errorCode} ${message}`);
      }
    }).catch(message => dispatch({
      type: GET_OFFICE_QUOTA.INVALID,
      message,
    }));
};

const confirmOfficeQuota = (token, kanimID, date, startHour, endHour) => (dispatch) => {
  dispatch({ type: CONFIRM_QUOTA.ATTEMPT });

  return confirmOfficeQuotaRequest(token, kanimID, date, startHour, endHour)
    .then((res) => {
      const {
        success, data, message, errorCode,
      } = res.data;

      if (success) {
        dispatch(confirmQuotaSync({
          timingID: data.timingID,
          kanimID,
          date,
          startHour,
          endHour,
        }));
      } else {
        throw new Error(`${errorCode} ${message}`);
      }
    }).catch(message => dispatch({
      type: CONFIRM_QUOTA.INVALID,
      message,
    }));
};

export {
  GET_OFFICES,
  GET_OFFICE_QUOTA,
  CONFIRM_QUOTA,
  getOffices,
  getOffice,
  confirmOfficeQuota,
  confirmQuotaSync,
};
