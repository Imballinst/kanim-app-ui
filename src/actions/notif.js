import {
  addNotification as addNotificationRequest,
  getNotifications as getNotificationsRequest,
  deleteNotification as deleteNotificationRequest,
} from './utils/requests';
import actionTypes from './utils/actionTypes';

// Variables
const ADD_NOTIFICATION = actionTypes('ADD_NOTIFICATION');
const GET_NOTIFICATIONS = actionTypes('GET_NOTIFICATIONS');
const DELETE_NOTIFICATION = actionTypes('DELETE_NOTIFICATION');

const addNotification = (userID, email, moID, session, dates, treshold) => (dispatch) => {
  dispatch({ type: ADD_NOTIFICATION.ATTEMPT });

  return addNotificationRequest(userID, email, moID, session, dates, treshold).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: ADD_NOTIFICATION.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: ADD_NOTIFICATION.INVALID,
    message,
  }));
};

const getNotifications = userID => (dispatch) => {
  dispatch({ type: GET_NOTIFICATIONS.ATTEMPT });

  return getNotificationsRequest(userID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: GET_NOTIFICATIONS.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: GET_NOTIFICATIONS.INVALID,
    message,
  }));
};

const deleteNotification = (userID, notificationID) => (dispatch) => {
  dispatch({ type: DELETE_NOTIFICATION.ATTEMPT });

  return deleteNotificationRequest(userID, notificationID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: DELETE_NOTIFICATION.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: DELETE_NOTIFICATION.INVALID,
    message,
  }));
};

export {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
  addNotification,
  getNotifications,
  deleteNotification,
};
