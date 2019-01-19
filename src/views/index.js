import React, { PureComponent } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Login from './Login';
import Home from './Home';
import Offices from './Offices';
import OfficeDetail from './Offices/Detail';
// import Notification from './Notification';
// import Queue from './Queue';
// import NotFound from './404';

const styles = theme => ({
  root: {
    fontFamily: 'Merriweather',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    background: theme.custom.background
  },
  content: {
    maxWidth: 600
  }
});

const redirectObject = (props, targetPath) => ({
  pathname: targetPath,
  state: { from: props.location }
});
const CustomRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (!isLoggedIn && rest.path !== '/login') {
        // If not authenticated, redirect to login.
        return <Redirect to={redirectObject(props, '/login')} />;
      } else if (isLoggedIn && rest.path === '/login') {
        // If authenticated and path is login, redirect to home.
        return <Redirect to={redirectObject(props, '/')} />;
      }

      // If path is not login, proceed normally.
      return <Component {...props} />;
    }}
  />
);

class Routes extends PureComponent {
  render() {
    const { classes, location, isLoggedIn } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.content}>
          <CssBaseline />
          <Switch>
            <CustomRoute
              isLoggedIn={isLoggedIn}
              exact
              path="/"
              location={location}
              component={Home}
            />
            <CustomRoute
              isLoggedIn={isLoggedIn}
              path="/offices"
              location={location}
              component={Offices}
            />
            <CustomRoute
              isLoggedIn={isLoggedIn}
              path="/offices/:officeID"
              location={location}
              component={OfficeDetail}
            />
            <CustomRoute
              isLoggedIn={isLoggedIn}
              path="/login"
              location={location}
              component={Login}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { isLoggedIn } = auth;

  return { isLoggedIn };
};
const mapDispatchToProps = {};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Routes);
