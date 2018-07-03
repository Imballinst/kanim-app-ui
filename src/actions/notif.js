import {
  addNotification as addNotificationRequest,
  getNotifications as getNotificationsRequest,
  getNotification as getNotificationRequest,
  deleteNotification as deleteNotificationRequest,
} from './helpers/requests';
import actionTypes from './helpers/actionTypes';

// Variables
const VIEW_NOTIF_MODIFY = 'VIEW_NOTIF_MODIFY';

const ADD_NOTIFICATION = actionTypes('ADD_NOTIFICATION');
const GET_NOTIFICATIONS = actionTypes('GET_NOTIFICATIONS');
const GET_NOTIFICATION = actionTypes('GET_NOTIFICATION');
const DELETE_NOTIFICATION = actionTypes('DELETE_NOTIFICATION');

const viewNotifModifySync = notification => ({
  type: VIEW_NOTIF_MODIFY,
  payload: notification,
});

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

const getNotification = (userID, notifID) => (dispatch) => {
  dispatch({ type: GET_NOTIFICATION.ATTEMPT });

  return getNotificationRequest(userID, notifID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: GET_NOTIFICATION.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: GET_NOTIFICATION.INVALID,
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
      dispatch({ type: DELETE_NOTIFICATION.SUCCESS, payload: data, deletedID: notificationID });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: DELETE_NOTIFICATION.INVALID,
    message,
  }));
};

export {
  VIEW_NOTIF_MODIFY,
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION,
  viewNotifModifySync,
  addNotification,
  getNotifications,
  getNotification,
  deleteNotification,
};
