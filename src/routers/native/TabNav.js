import React from 'react';
import { TouchableHighlight, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator } from 'react-navigation';

import HomeStack from './HomeStack';
import NotifStack from './NotifStack';
import QueueStack from './QueueStack';
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
const notifIcon = ({ tintColor }) => getIcon('bell', tintColor);
const queueIcon = ({ tintColor }) => getIcon('table', tintColor);

const tabNavOpts = (tabBarIcon, title) => ({ navigation }) => {
  const { routes, index } = navigation.state;
  const { routeName } = routes[index];

  return {
    tabBarIcon,
    title,
    tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
      const { index: previousIndex } = previousScene;

      // Enable press and swipe only if on the root stack
      if (previousScene.routes[previousIndex].routeName.includes('List')) {
        jumpToIndex(scene.index);
      }
    },
    swipeEnabled: routeName.includes('List'),
  };
};

const TabNav = TabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: tabNavOpts(homeIcon, 'Home'),
  },
  NotifStack: {
    screen: NotifStack,
    navigationOptions: tabNavOpts(notifIcon, 'Reminder'),
  },
  QueueStack: {
    screen: QueueStack,
    navigationOptions: tabNavOpts(queueIcon, 'Antrian'),
  },
}, {
  tabBarPosition: 'top',
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
