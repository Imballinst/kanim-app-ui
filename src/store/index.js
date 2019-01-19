import { applyMiddleware, combineReducers, createStore, compose } from 'redux';

// Middlewares, reducers, and versioners
import middlewares from './middlewares';

import kanim from './reducers/kanim';
import auth from './reducers/auth';
import queue from './reducers/queue';
import notif from './reducers/notif';

const combinedReducers = combineReducers({
  kanim,
  auth,
  queue,
  notif
});

export default createStore(combinedReducers, compose(applyMiddleware(...middlewares)));
