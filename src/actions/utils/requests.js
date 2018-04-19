import axios from 'axios';

// List URLS
const apiUrl = 'http://192.168.100.3:8000';
const urlLogin = 'https://antrian.imigrasi.go.id/Authentication.jsp';
// const urlHome = 'https://antrian.imigrasi.go.id/Index.jsp';

const urlRestRegister = 'https://antrian.imigrasi.go.id/rest/Registration.jsp';
const urlRestLogin = 'https://antrian.imigrasi.go.id/rest/Authentication.jsp';
const urlRestListKanim = 'https://antrian.imigrasi.go.id/rest/PostKanim.jsp';
const urlRestAvailabilityInfo = `${apiUrl}/quota`;
const urlRestQuotaInfo = 'https://antrian.imigrasi.go.id/rest/QuotaInfo.jsp';
const urlRestRegisterQueue = 'https://antrian.imigrasi.go.id/rest/RegisterQueue.jsp';
const urlRestListQueue = 'https://antrian.imigrasi.go.id/rest/ListQueue.jsp';
const urlRestCancelQueue = 'https://antrian.imigrasi.go.id/rest/CancelQueue.jsp';

// Request Functions
const getMainPage = () => axios({
  method: 'get',
  url: urlLogin,
});

const postAvailabilityInfo = (token, kanimID, startDate, endDate) => axios({
  method: 'post',
  url: `${urlRestAvailabilityInfo}/${kanimID}`,
  data: {
    token,
    startDate,
    endDate,
  },
});

const postCancelQueue = queueString => axios({
  method: 'post',
  url: urlRestCancelQueue,
  data: {
    NO_ANTRIAN: queueString,
  },
});

const postListQueue = (token, userID) => axios({
  method: 'post',
  url: urlRestListQueue,
  data: {
    Token: token,
    UserId: userID,
  },
});

const postRegister = data => axios({
  method: 'post',
  url: urlRestRegister,
  data,
});

const postLogin = (username, password) => {
  const data = {
    Username: username,
    Password: password,
  };

  return axios({
    method: 'post',
    url: urlRestLogin,
    data,
  });
};

const postListKanim = () => axios({
  method: 'post',
  url: urlRestListKanim,
  data: {
    // Sadly this params won't work
    SearchKeyWord: '',
  },
});

const postQuotaInfo = (token, kanimID, date, startHr, endHr) => axios({
  method: 'post',
  url: urlRestQuotaInfo,
  data: {
    Token: token,
    KANIM_ID: kanimID,
    REQUESTED_DATE: date,
    START_HOUR: startHr,
    END_HOUR: endHr,
  },
});

const postRegisterQueue = (applicantCount, token, userID, tID, name, nik) => axios({
  method: 'post',
  url: urlRestRegisterQueue,
  data: {
    JumlahPemohon: applicantCount,
    Token: token,
    UserId: userID,
    DetailTimingId: tID,
    NAMA_PENGANTRI_1: name,
    NIK_PENGANTRI_1: nik,
  },
});

export {
  getMainPage,
  postAvailabilityInfo,
  postCancelQueue,
  postListQueue,
  postLogin,
  postListKanim,
  postQuotaInfo,
  postRegister,
  postRegisterQueue,
};
