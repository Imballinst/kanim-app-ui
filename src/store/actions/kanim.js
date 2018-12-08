import {
  getOffices as httpGetOffices,
  getOfficeQuota as httpGetOffice,
  confirmOfficeQuota as httpGetOfficeQuota
} from './requests';
import { CONFIRM_QUOTA, GET_OFFICES, GET_OFFICE_QUOTA } from '../actionTypes';

// Action creators
const confirmQuotaSync = payload => ({
  type: CONFIRM_QUOTA.SUCCESS,
  payload
});

// Async actions
const getOffices = token => async dispatch => {
  dispatch({ type: GET_OFFICES.ATTEMPT });

  try {
    const { data } = await httpGetOffices(token);
    const { success, data, message, errorCode } = data;

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
    const { data } = await httpGetOffice(token, kanimID, startDate, endDate);
    const { success, data, message, errorCode } = res;

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
  dispatch({ type: CONFIRM_QUOTA.ATTEMPT });

  try {
    const { data } = httpGetOfficeQuota(token, kanimID, date, startHour, endHour);
    const { success, data, message, errorCode } = data;

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
      type: CONFIRM_QUOTA.FAILED,
      message: errorMessage
    });
  }
};

export { getOffices, getOffice, confirmOfficeQuota, confirmQuotaSync };
