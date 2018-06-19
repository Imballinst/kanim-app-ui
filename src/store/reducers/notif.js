import { LOGIN } from '../../actions/auth';
import {
  ADD_NOTIFICATION,
  GET_NOTIFICATIONS,
  DELETE_NOTIFICATION,
} from '../../actions/notif';

const defaultState = {
  addNotificationAttempt: false,
  addNotificationError: '',
  addNotificationResult: undefined,
  getNotificationsAttempt: false,
  getNotificationsError: '',
  notifications: [],
  isNotificationsExist: false,
  deleteNotificationAttempt: false,
  deleteNotificationError: '',
  deleteNotificationResult: undefined,
};

const notif = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN.SUCCESS: {
      return { ...defaultState };
    }
    case ADD_NOTIFICATION.ATTEMPT: {
      return {
        ...state,
        addNotificationAttempt: true,
        addNotificationError: '',
      };
    }
    case ADD_NOTIFICATION.SUCCESS: {
      return {
        ...state,
        addNotificationResult: action.payload,
        addNotificationAttempt: false,
      };
    }
    case ADD_NOTIFICATION.INVALID: {
      return {
        ...state,
        addNotificationAttempt: false,
        addNotificationError: action.message,
      };
    }
    case GET_NOTIFICATIONS.ATTEMPT: {
      return {
        ...state,
        getNotificationsAttempt: true,
        getNotificationsError: '',
        isNotificationsExist: false,
      };
    }
    case GET_NOTIFICATIONS.SUCCESS: {
      const notifications = action.payload;
      const isNotificationsExist = notifications.length > 0;

      return {
        ...state,
        notifications,
        getNotificationsAttempt: false,
        isNotificationsExist,
      };
    }
    case GET_NOTIFICATIONS.INVALID: {
      return {
        ...state,
        getNotificationsAttempt: false,
        getNotificationsError: action.message,
      };
    }
    case DELETE_NOTIFICATION.ATTEMPT: {
      return {
        ...state,
        deleteNotificationAttempt: true,
        deleteNotificationError: '',
      };
    }
    case DELETE_NOTIFICATION.SUCCESS: {
      return {
        ...state,
        deleteNotificationResult: action.payload,
        deleteNotificationAttempt: false,
      };
    }
    case DELETE_NOTIFICATION.INVALID: {
      return {
        ...state,
        deleteNotificationAttempt: false,
        deleteNotificationError: action.message,
      };
    }
    default: return state;
  }
};

export { defaultState };
export default notif;
