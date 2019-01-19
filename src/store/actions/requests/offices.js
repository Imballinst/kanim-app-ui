import request from './_base';

const getOffices = token => request('/offices', 'get', undefined, token);
const getAvailability = (token, kanimID, startDate, endDate) =>
  request(
    `/offices/${kanimID}`,
    'get',
    {
      startDate,
      endDate
    },
    token
  );

const checkQuotaInfo = (token, kanimID, date, startHour, endHour) =>
  request(
    `/offices/${kanimID}/check`,
    'post',
    {
      date,
      startHour,
      endHour
    },
    token
  );

export { getOffices, getAvailability, checkQuotaInfo };
