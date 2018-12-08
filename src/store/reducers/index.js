import { combineReducers } from 'redux';

import kanim from './kanim';
import auth from './auth';
import queue from './queue';
import notif from './notif';

export default combineReducers({
  kanim,
  auth,
  queue,
  notif
});
