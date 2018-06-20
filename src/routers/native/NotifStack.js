import { StackNavigator } from 'react-navigation';

import NotifList from '../../containers/NotifList';
import NotifDetail from '../../containers/NotifDetail';

export default StackNavigator({
  NotifList: { screen: NotifList },
  NotifDetail: { screen: NotifDetail },
}, {
  headerMode: 'none',
});
