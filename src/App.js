import React from 'react';
import { Router } from 'react-router';
import { Provider } from 'unstated';
import createBrowserHistory from 'history/createBrowserHistory';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import Routes from './views';

const history = createBrowserHistory();
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5f5f5f',
      main: '#353535',
      dark: '#0f0f0f',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#6a9c9f',
      main: '#3c6e71',
      dark: '#0a4346',
      contrastText: '#ffffff'
    }
  },
  custom: {
    shadow: '3px 5px'
  },
  typography: {
    useNextVariants: true
  }
});

const App = () => (
  <Provider>
    <Router history={history}>
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </Router>
  </Provider>
);

export default App;
