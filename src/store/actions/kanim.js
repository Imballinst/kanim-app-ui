import {
  getOffices as httpGetOffices,
  getAvailability as httpGetOffice,
  checkQuotaInfo as httpGetOfficeQuota
} from './requests';
import { CHECK_QUOTA, GET_OFFICES, GET_OFFICE_QUOTA } from '../actionTypes';

// Action creators
const confirmQuotaSync = payload => ({
  type: CHECK_QUOTA.SUCCESS,
  payload
});

// Async actions
const getOffices = token => async dispatch => {
  dispatch({ type: GET_OFFICES.ATTEMPT });

  try {
    const {
      data: { success, data, message, errorCode }
    } = await httpGetOffices(token);

    if (success) {
      dispatch({ type: GET_OFFICES.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: GET_OFFICES.FAILED,
      message: errorMessage
    });
  }
};

const getOffice = (token, kanimID, startDate, endDate) => async dispatch => {
  dispatch({ type: GET_OFFICE_QUOTA.ATTEMPT, payload: kanimID });

  try {
    const {
      data: { success, data, message, errorCode }
    } = await httpGetOffice(token, kanimID, startDate, endDate);

    if (success) {
      dispatch({ type: GET_OFFICE_QUOTA.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: GET_OFFICE_QUOTA.FAILED,
      message: errorMessage
    });
  }
};

const confirmOfficeQuota = (token, kanimID, date, startHour, endHour) => async dispatch => {
  dispatch({ type: CHECK_QUOTA.ATTEMPT });

  try {
    const {
      data: { success, data, message, errorCode }
    } = httpGetOfficeQuota(token, kanimID, date, startHour, endHour);

    if (success) {
      dispatch(
        confirmQuotaSync({
          timingID: data.timingID,
          kanimID,
          date,
          startHour,
          endHour
        })
      );
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: CHECK_QUOTA.FAILED,
      message: errorMessage
    });
  }
};

export { getOffices, getOffice, confirmOfficeQuota, confirmQuotaSync };
