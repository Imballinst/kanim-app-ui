import { StackNavigator } from 'react-navigation';

import NotifList from '../../containers/NotifList';
import NotifDetail from '../../components/NotifDetail';

export default StackNavigator({
  NotifList: { screen: NotifList },
  NotifDetail: { screen: NotifDetail },
}, {
  headerMode: 'none',
});
