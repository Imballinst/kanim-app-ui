import request from './_base';

const getQueues = (token, userID) =>
  request(
    '/queue',
    'get',
    {
      userID
    },
    token
  );

const registerQueue = (applicantCount, token, userID, timingID, name, nik) =>
  request(
    '/queue',
    'post',
    {
      applicantCount,
      userID,
      timingID,
      name,
      nik
    },
    token
  );

const deleteQueue = (token, queueNumber) =>
  request(`/queue/${queueNumber}`, 'delete', undefined, token);

export { registerQueue, getQueues, deleteQueue };
