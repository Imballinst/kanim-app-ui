import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import titleCase from 'title-case';

import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ControlRow from './components/ControlRow';

import Login from './Login';
import Home from './Home';
// import Notification from './Notification';
// import Offices from './Offices';
// import Queue from './Queue';
// import NotFound from './404';

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
    height: '100vh',
    position: 'relative',
    background: theme.palette.primary,
    padding: theme.spacing.unit * 3
  }
});

const CustomRoute = ({ path, location, component: RouteComponent, ...props }) => {
  return (
    <Route exact path={path} {...props} render={routeProps => <RouteComponent {...routeProps} />} />
  );
};

class Routes extends PureComponent {
  render() {
    const { classes, location } = this.props;

    return (
      <div className={classes.root}>
        <Fragment>
          <CssBaseline />
          <ControlRow />
          <Switch>
            <CustomRoute exact path="/" location={location} component={Home} />
            <CustomRoute path="/login" location={location} component={Login} />
          </Switch>
        </Fragment>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(Routes);
