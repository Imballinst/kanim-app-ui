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
      light: '#39796b',
      main: '#004d40',
      dark: '#00251a',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#c0cfff',
      main: '#8c9eff',
      dark: '#5870cb',
      contrastText: '#000000'
    }
  },
  custom: {
    shadow: {
      big: '6px 9px #000',
      medium: '4px 6px #000',
      small: '2px 3px #000'
    }
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
