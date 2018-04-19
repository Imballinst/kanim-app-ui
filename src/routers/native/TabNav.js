import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';
import HomeStack from './HomeStack';
import Stub from '../../components/Stub';
import {
  primaryMineshaft,
  secondaryWilliam,
  tertiaryWhite,
  tertiaryAlto,
} from '../../utils/colors';

const getIcon = (iconName, tintColor) => (
  <Icon style={{ flex: 0 }} name={iconName} size={20} color={tintColor} />
);

const homeIcon = ({ tintColor }) => getIcon('home', tintColor);
const stubIcon = ({ tintColor }) => getIcon('table', tintColor);

const TabNav = TabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: { tabBarIcon: homeIcon, title: 'Home' },
  },
  Stub: {
    screen: Stub,
    navigationOptions: { tabBarIcon: stubIcon },
  },
}, {
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  initialRouteName: 'HomeStack',
  tabBarOptions: {
    showIcon: true,
    activeTintColor: tertiaryWhite,
    activeBackgroundColor: secondaryWilliam,
    inactiveTintColor: tertiaryAlto,
    inactiveBackgroundColor: tertiaryAlto,
    tabStyle: { flexDirection: 'row' },
    indicatorStyle: {
      backgroundColor: tertiaryWhite,
    },
    style: {
      backgroundColor: secondaryWilliam,
    },
  },
});

TabNav.navigationOptions = ({ screenProps }) => ({
  title: `Halo, ${screenProps.username}`,
  headerStyle: {
    backgroundColor: primaryMineshaft,
  },
  headerTitleStyle: {
    color: tertiaryAlto,
  },
  headerTintColor: tertiaryAlto,
  headerLeft: null,
  headerRight: (
    <TouchableHighlight
      underlayColor={tertiaryAlto}
      onPress={() => screenProps.logout()}
      style={{ marginRight: 20 }}
    >
      <Text style={{ color: tertiaryAlto }}>Logout</Text>
    </TouchableHighlight>
  ),
});

export default TabNav;
