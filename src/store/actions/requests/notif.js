import request from './_base';

const getNotifications = userID => request(`/user/${userID}/notification`, 'get');
const getNotification = (userID, notificationID) =>
  request(`/user/${userID}/notification/${notificationID}`, 'get');

const addNotification = ({ userID, moID, session, dates, email, treshold }) => {
  const { startDate, endDate } = dates;

  return request(`/user/${userID}/notification`, 'post', {
    moID,
    session,
    startDate,
    endDate,
    email,
    treshold
  });
};

const editNotification = (notificationID, { userID, session, treshold }) =>
  request(`/user/${userID}/notification/${notificationID}`, 'put', {
    session,
    treshold
  });

const deleteNotification = (userID, notificationID) =>
  request(`/user/${userID}/notification/${notificationID}`, 'delete');

export { getNotifications, getNotification, addNotification, editNotification, deleteNotification };
