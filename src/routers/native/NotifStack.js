import { StackNavigator } from 'react-navigation';

import NotifList from '../../containers/NotifList';
import NotifEdit from '../../containers/NotifEdit';

export default StackNavigator({
  NotifList: { screen: NotifList },
  NotifEdit: { screen: NotifEdit },
}, {
  headerMode: 'none',
});
