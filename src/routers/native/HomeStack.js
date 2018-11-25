import { StackNavigator } from 'react-navigation';

import KanimList from '../../containers/KanimList';
import KanimDetail from '../../containers/KanimDetail';
import NotifAdd from '../../containers/NotifAdd';

export default StackNavigator({
  KanimList: { screen: KanimList },
  KanimDetail: { screen: KanimDetail },
  KanimNotifAdd: { screen: NotifAdd },
}, {
  headerMode: 'none',
});
