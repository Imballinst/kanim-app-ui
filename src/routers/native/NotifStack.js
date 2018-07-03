import { StackNavigator } from 'react-navigation';

import NotifList from '../../containers/NotifList';
import NotifDetail from '../../containers/NotifDetail';
import NotifModify from '../../containers/NotifModify';

export default StackNavigator({
  NotifList: { screen: NotifList },
  NotifDetail: { screen: NotifDetail },
  NotifModify: { screen: NotifModify },
}, {
  headerMode: 'none',
});
