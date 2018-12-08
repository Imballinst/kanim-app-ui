import {
  addNotification as httpAddNotification,
  editNotification as httpEditNotification,
  getNotifications as httpGetNotifications,
  getNotification as httpGetNotification,
  deleteNotification as httpDeleteNotification
} from './requests';
import {
  VIEW_NOTIF_MODIFY,
  ADD_NOTIFICATION,
  EDIT_NOTIFICATION,
  GET_NOTIFICATIONS,
  GET_NOTIFICATION,
  DELETE_NOTIFICATION
} from '../actionTypes';

const viewNotifModifySync = notification => dispatch => {
  dispatch({
    type: VIEW_NOTIF_MODIFY,
    payload: notification
  });

  // TODO(aji): edit this later
  const destRoute = notification.backNavigation === 'KanimDetail' ? 'KanimNotifAdd' : 'NotifEdit';

  return dispatch(NavigationActions.navigate({ routeName: destRoute }));
};

const addNotification = notifData => async dispatch => {
  dispatch({ type: ADD_NOTIFICATION.ATTEMPT, payload: notifData });

  try {
    const { data } = await httpAddNotification(notifData);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: ADD_NOTIFICATION.SUCCESS, payload: data });

      // TODO(aji): edit this later
      // Reset HomeStack to KanimList, and navigate to NotifStack
      dispatch(NavigationActions.navigate({ routeName: 'KanimList' }));
      dispatch(NavigationActions.navigate({ routeName: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: ADD_NOTIFICATION.FAILED,
      message: errorMessage
    });
  }
};

const editNotification = (notifID, notifData) => async dispatch => {
  dispatch({ type: EDIT_NOTIFICATION.ATTEMPT, payload: { notifID, notifData } });

  try {
    const { data } = await httpEditNotification(notifID, notifData);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: EDIT_NOTIFICATION.SUCCESS, payload: { data, notifID, notifData } });
      // TODO(aji): edit this later
      dispatch(NavigationActions.navigate({ routeName: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: EDIT_NOTIFICATION.FAILED,
      message: errorMessage
    });
  }
};

const getNotifications = userID => async dispatch => {
  dispatch({ type: GET_NOTIFICATIONS.ATTEMPT });

  try {
    const { data } = await httpGetNotifications(userID);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: GET_NOTIFICATIONS.SUCCESS, payload: data });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: GET_NOTIFICATIONS.FAILED,
      message: errorMessage
    });
  }
};

const getNotification = (userID, notifID) => async dispatch => {
  dispatch({ type: GET_NOTIFICATION.ATTEMPT, payload: { userID, notifID } });

  try {
    const { data } = await httpGetNotification(userID, notifID);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: GET_NOTIFICATION.SUCCESS, payload: data });
      // TODO(aji): edit this later
      // Change view, set backNavigation to NotifList
      dispatch(viewNotifModifySync({ ...data, backNavigation: 'NotifList' }));
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: GET_NOTIFICATION.FAILED,
      message: errorMessage
    });
  }
};

const deleteNotification = (userID, notificationID) => async dispatch => {
  dispatch({ type: DELETE_NOTIFICATION.ATTEMPT, payload: { userID, notificationID } });

  try {
    const { data } = await httpDeleteNotification(userID, notificationID);
    const { success, data, message, errorCode } = data;

    if (success) {
      dispatch({ type: DELETE_NOTIFICATION.SUCCESS, payload: data, deletedID: notificationID });
    } else {
      throw new Error(`${errorCode} ${message}`);
    }
  } catch (errorMessage) {
    dispatch({
      type: DELETE_NOTIFICATION.FAILED,
      message: errorMessage
    });
  }
};

export {
  viewNotifModifySync,
  addNotification,
  editNotification,
  getNotifications,
  getNotification,
  deleteNotification
};
