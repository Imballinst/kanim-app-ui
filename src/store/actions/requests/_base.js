import axios from 'axios';

const buildHeaders = (cookie, customHeaders = {}) =>
  Object.assign(
    {
      Cookie: `JSESSIONID=${cookie}`
    },
    customHeaders
  );

export default (path, method, data, token) => {
  // Validation
  if (typeof path !== 'string') {
    throw new Error('Path must be a string!');
  }

  if (typeof method !== 'string') {
    throw new Error('Method must be a string!');
  }

  if (data !== undefined && typeof data !== 'object') {
    throw new Error('Data must be an object!');
  }

  if (token !== undefined && typeof token !== 'string') {
    throw new Error('Cookie must be a string!');
  }

  // Do request if all of these requirements are fulfilled
  return axios({
    method,
    // Path always starts with "/"
    url: `${REACT_APP_API_URL}${path}`,
    headers: {
      'x-imm-token': token
    },
    data: ['put', 'post', 'patch'].includes(method.toLowerCase()) && data,
    params: method.toLowerCase() === 'get' && data
  });
};
