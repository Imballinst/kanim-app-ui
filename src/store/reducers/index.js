import { combineReducers } from 'redux';

import nav from './nav';
import counter from './counter';
import kanim from './kanim';
import auth from './auth';

export default combineReducers({
  nav, counter, kanim, auth,
});
