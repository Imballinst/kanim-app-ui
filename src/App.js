import React from 'react';
import { Router } from 'react-router';

import { Provider } from 'react-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import store from './store';
import Routes from './views';

const history = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6ec6ff',
      main: '#2196f3',
      dark: '#0069c0',
      contrastText: '#000'
    },
    secondary: {
      light: '#fd558f',
      main: '#c51162',
      dark: '#8e0038',
      contrastText: '#fff'
    }
  },
  custom: {
    shadow: {
      big: '3px 6px #000',
      medium: '2px 4px #000',
      small: '1px 2px #000'
    },
    background: '#d9d9d9'
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
