import { NavigationActions } from 'react-navigation';

import {
  addNotification as addNotificationRequest,
  editNotification as editNotificationRequest,
  getNotifications as getNotificationsRequest,
  getNotification as getNotificationRequest,
  deleteNotification as deleteNotificationRequest,
} from './helpers/requests';
import actionTypes from './helpers/actionTypes';

// Variables
const VIEW_NOTIF_MODIFY = 'VIEW_NOTIF_MODIFY';

const ADD_NOTIFICATION = actionTypes('ADD_NOTIFICATION');
const EDIT_NOTIFICATION = actionTypes('EDIT_NOTIFICATION');
const GET_NOTIFICATIONS = actionTypes('GET_NOTIFICATIONS');
const GET_NOTIFICATION = actionTypes('GET_NOTIFICATION');
const DELETE_NOTIFICATION = actionTypes('DELETE_NOTIFICATION');

const viewNotifModifySync = notification => (dispatch) => {
  dispatch({
    type: VIEW_NOTIF_MODIFY,
    payload: notification,
  });

  const destRoute = notification.backNavigation === 'KanimDetail' ?
    'KanimNotifAdd' : 'NotifEdit';

  return dispatch(NavigationActions.navigate({ routeName: destRoute }));
};

const addNotification = notifData => (dispatch) => {
  dispatch({ type: ADD_NOTIFICATION.ATTEMPT, payload: notifData });

  return addNotificationRequest(notifData).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: ADD_NOTIFICATION.SUCCESS, payload: data });
      // Reset HomeStack to KanimList, and navigate to NotifStack
      dispatch(NavigationActions.navigate({ routeName: 'KanimList' }));
      dispatch(NavigationActions.navigate({ routeName: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: ADD_NOTIFICATION.INVALID,
    message,
  }));
};

const editNotification = (notifID, notifData) => (dispatch) => {
  dispatch({ type: EDIT_NOTIFICATION.ATTEMPT, payload: { notifID, notifData } });

  return editNotificationRequest(notifID, notifData).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: EDIT_NOTIFICATION.SUCCESS, payload: { data, notifID, notifData } });
      dispatch(NavigationActions.navigate({ routeName: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: EDIT_NOTIFICATION.INVALID,
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
  dispatch({ type: GET_NOTIFICATION.ATTEMPT, payload: { userID, notifID } });

  return getNotificationRequest(userID, notifID).then((res) => {
    const {
      success, data, message, errorCode,
    } = res.data;

    if (success) {
      dispatch({ type: GET_NOTIFICATION.SUCCESS, payload: data });
      // Change view, set backNavigation to NotifList
      dispatch(viewNotifModifySync({ ...data, backNavigation: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  }).catch(message => dispatch({
    type: GET_NOTIFICATION.INVALID,
    message,
  }));
};

const deleteNotification = (userID, notificationID) => (dispatch) => {
  dispatch({ type: DELETE_NOTIFICATION.ATTEMPT, payload: { userID, notificationID } });

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
  EDIT_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION,
  viewNotifModifySync,
  addNotification,
  editNotification,
  getNotifications,
  getNotification,
  deleteNotification,
};
