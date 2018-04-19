import ReduxThunk from 'redux-thunk';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

export default [
  ReduxThunk,
  createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
  ),
];
