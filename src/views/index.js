import React, { PureComponent, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Subscribe } from 'unstated';
import { compose } from 'recompose';

import titleCase from 'title-case';

import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import AuthContainer from '../containers/Auth';
import HomeContainer from '../containers/Home';
import NotificationContainer from '../containers/Notification';
import OfficeContainer from '../containers/Office';
import QueueContainer from '../containers/Queue';

import ControlRow from './components/ControlRow';

import Home from './Home';
import Notification from './Notification';
import Offices from './Offices';
import Queue from './Queue';
import NotFound from './404';

const styles = theme => ({
  root: {
    fontFamily: 'Roboto',
    height: '100vh',
    position: 'relative',
    background: theme.palette.primary,
    padding: theme.spacing.unit * 3
  }
});

const CustomRoute = ({ containers, location, component: RouteComponent, ...props }) => {
  const states = Object.keys(containers).reduce((obj, key) => {
    obj[`state${titleCase(key)}`] = containers[key].state;

    return obj;
  }, {});

  return (
    <Route
      exact
      {...props}
      render={routeProps => (
        // Spread the state, because if not, we will always be creating new objects
        <RouteComponent containers={containers} {...states} {...routeProps} />
      )}
    />
  );
};

class Wrapper extends PureComponent {
  render() {
    const { auth, home, notification, office, queue, location } = this.props;

    return (
      <Fragment>
        <CssBaseline />
        <ControlRow containers={auth} containerState={containerState} />
        <Switch>
          <CustomRoute exact path="/" location={location} containers={container} component={Home} />
          <CustomRoute
            path="/offices"
            location={location}
            containers={container}
            component={Offices}
          />
          <CustomRoute path="/queue" location={location} containers={container} component={Queue} />
          <CustomRoute
            path="/notification"
            location={location}
            containers={container}
            component={Notification}
          />
          <CustomRoute path="*" location={location} containers={container} component={NotFound} />
        </Switch>
      </Fragment>
    );
  }
}

class Routes extends PureComponent {
  render() {
    const { classes, location } = this.props;

    return (
      <div className={classes.root}>
        <Subscribe
          to={[
            AuthContainer,
            HomeContainer,
            NotificationContainer,
            OfficeContainer,
            QueueContainer
          ]}
        >
          {(auth, home, notification, office, queue) => (
            <Wrapper
              location={location}
              auth={auth}
              home={home}
              notification={notification}
              office={office}
              queue={queue}
            />
          )}
        </Subscribe>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(Routes);
