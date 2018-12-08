import request from './_base';

const login = (username, password) =>
  request('/login', 'post', {
    username,
    password
  });
const register = ({ username, password, nik, phone, email, address }) =>
  request('/signup', 'post', {
    username,
    password,
    nik,
    phone,
    email,
    address
  });
const resetPassword = ({ email }) => request('/reset_password', 'post', { email });

export { login, register, resetPassword };
