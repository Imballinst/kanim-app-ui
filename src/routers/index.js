import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { NavigationActions, StackNavigator, addNavigationHelpers } from 'react-navigation';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { logout as logoutAction } from '../actions/auth';
import Login from '../containers/Login';
import TabNav from './native/TabNav';

const AppNavigator = StackNavigator({
  Login: { screen: Login, navigationOptions: { header: null } },
  TabNav: { screen: TabNav },
});
const addListener = createReduxBoundAddListener('root');

class AppWithNavigationState extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;

    if (nav.index === 0) {
      return false;
    }

    const screenKeyBefore = nav.routes[nav.routes.length - 2].routeName;
    dispatch(NavigationActions.navigate({ routeName: screenKeyBefore }));

    return true;
  }

  render() {
    const {
      dispatch, nav, auth, logout,
    } = this.props;
    const username = (auth && auth.user && auth.user.MU_USERNAME) || '';

    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch,
          state: nav,
          addListener,
        })}
        screenProps={{
          username,
          logout,
        }}
      />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ nav, auth }) => ({ nav, auth });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ logout: logoutAction }, dispatch),
  dispatch,
});

export { AppNavigator };
export default connect(mapStateToProps, mapDispatchToProps)(AppWithNavigationState);
