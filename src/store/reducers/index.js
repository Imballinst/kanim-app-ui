import { combineReducers } from 'redux';

import nav from './nav';
import kanim from './kanim';
import auth from './auth';
import queue from './queue';
import notif from './notif';

export default combineReducers({
  nav,
  kanim,
  auth,
  queue,
  notif,
});
