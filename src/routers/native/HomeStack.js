import { StackNavigator } from 'react-navigation';

import KanimList from '../../containers/KanimList';
import KanimDetail from '../../containers/KanimDetail';
import NotifModify from '../../containers/NotifModify';

export default StackNavigator({
  KanimList: { screen: KanimList },
  KanimDetail: { screen: KanimDetail },
  KanimNotifModify: { screen: NotifModify },
}, {
  headerMode: 'none',
});
