import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';

const middlewares = [ReduxThunk];

if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}

export default middlewares;
