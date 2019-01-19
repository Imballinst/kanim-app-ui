const generateType = type => ({
  ATTEMPT: `${type}_ATTEMPT`,
  SUCCESS: `${type}_SUCCESS`,
  FAILED: `${type}_FAILED`
});

export const LOGIN = generateType('LOGIN');
export const LOGOUT = generateType('LOGOUT');
export const REFRESH = generateType('REFRESH');

export const GET_OFFICES = generateType('GET_OFFICES');
export const GET_OFFICE_QUOTA = generateType('GET_OFFICE_QUOTA');
export const CHECK_QUOTA = generateType('CHECK_QUOTA');

export const VIEW_NOTIF_MODIFY = generateType('VIEW_NOTIF_MODIFY');
export const ADD_NOTIFICATION = generateType('ADD_NOTIFICATION');
export const EDIT_NOTIFICATION = generateType('EDIT_NOTIFICATION');
export const GET_NOTIFICATIONS = generateType('GET_NOTIFICATIONS');
export const GET_NOTIFICATION = generateType('GET_NOTIFICATION');
export const DELETE_NOTIFICATION = generateType('DELETE_NOTIFICATION');

export const REGISTER_QUEUE = generateType('REGISTER_QUEUE');
export const GET_QUEUES = generateType('GET_QUEUES');
export const CANCEL_QUEUE = generateType('CANCEL_QUEUE');
