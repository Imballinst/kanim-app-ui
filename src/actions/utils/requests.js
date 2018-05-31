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

const checkOfficeQuota = (token, kanimID, date, startHr, endHr) => axios({
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
    JumlahPemohon: count,
    UserId: userID,
    DetailTimingId: tID,
    NAMA_PENGANTRI_1: name,
    NIK_PENGANTRI_1: nik,
  },
});

const cancelQueue = (token, queueNumber) => axios({
  method: 'delete',
  headers: { 'x-imm-token': token },
  url: `${apiUrl}/queue/${queueNumber}`,
  data: {
    NO_ANTRIAN: queueNumber,
  },
});

export {
  getMainPage,
  // register,
  login,
  getOffices,
  getOfficeQuota,
  checkOfficeQuota,
  getQueues,
  registerQueue,
  cancelQueue,
};
