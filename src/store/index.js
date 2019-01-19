import { applyMiddleware, createStore, compose } from 'redux';

// Middlewares, reducers, and versioners
import middlewares from './middlewares';
import combinedReducers from './reducers';

export default createStore(combinedReducers, compose(applyMiddleware(...middlewares)));
