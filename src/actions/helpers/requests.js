import axios from 'axios';
import { API_URL as apiUrl } from 'react-native-dotenv';

// List URLS
const urlLogin = 'https://antrian.imigrasi.go.id/Authentication.jsp';

// Request Functions
const getMainPage = () => axios({
  method: 'get',
  url: urlLogin,
});

// const register = data => axios({
//   method: 'post',
//   url: urlRestRegister,
//   data,
// });

const login = (username, password) => {
  const data = { username, password };

  return axios({
    method: 'post',
    url: `${apiUrl}/login`,
    data,
  });
};

const getOffices = token => axios({
  method: 'get',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/offices`,
  params: {
    // Sadly this params won't work
    SearchKeyWord: '',
  },
});

const getOfficeQuota = (token, kanimID, startDate, endDate) => axios({
  method: 'get',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/offices/${kanimID}`,
  params: {
    startDate,
    endDate,
  },
});

const confirmOfficeQuota = (token, kanimID, date, startHr, endHr) => axios({
  method: 'post',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/offices/${kanimID}/check`,
  data: {
    date,
    startHour: startHr,
    endHour: endHr,
  },
});

const getQueues = (token, userID) => axios({
  method: 'get',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/queue`,
  params: {
    userID,
  },
});

const registerQueue = (kanimID, token, count, userID, tID, name, nik) => axios({
  method: 'post',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/offices/${kanimID}/register`,
  data: {
    applicantCount: count,
    userID,
    timingID: tID,
    name,
    nik,
  },
});

const cancelQueue = (token, queueNumber) => axios({
  method: 'delete',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/queue/${queueNumber}`,
});

const getNotifications = userID => axios({
  method: 'get',
  url: `${apiUrl}/user/${userID}/notification`,
});

const getNotification = (userID, notifID) => axios({
  method: 'get',
  url: `${apiUrl}/user/${userID}/notification/${notifID}`,
});

const addNotification = ({
  userID, moID, session, dates, email, treshold,
}) => {
  const { startDate, endDate } = dates;

  return axios({
    method: 'post',
    url: `${apiUrl}/user/${userID}/notification`,
    data: {
      moID,
      session,
      startDate,
      endDate,
      email,
      treshold,
    },
  });
};

const editNotification = (notificationID, {
  userID, session, treshold,
}) => axios({
  method: 'put',
  url: `${apiUrl}/user/${userID}/notification/${notificationID}`,
  data: {
    session,
    treshold,
  },
});

const deleteNotification = (userID, notificationID) => axios({
  method: 'delete',
  url: `${apiUrl}/user/${userID}/notification/${notificationID}`,
});

export {
  getMainPage,
  // register,
  login,
  getOffices,
  getOfficeQuota,
  confirmOfficeQuota,
  getQueues,
  registerQueue,
  cancelQueue,
  getNotifications,
  getNotification,
  addNotification,
  editNotification,
  deleteNotification,
};
